using CC.Function;
using CC.Model;
using Newtonsoft.Json;
using System.Text;

namespace CC.Http
{
    public class HClient
    {
        private readonly String UserName = "API-CCC-JHBRE-3155";
        private readonly String SecretKey = "XRwBgTPHeD";
        private readonly String ClientId = "3155";

        public String Token(MSincronizacion model,Int32 page)
        {

            String Token1 = String.Empty;
            String SecretHash = String.Empty;
            String Token2 = String.Empty;
            String AuthToken = String.Empty;
            String Data = String.Empty;

            switch (model.Option)
            {
                case 1:
                    Data = @"{""datetime_from"": """ + (DateTime.Parse(model.FechaInicio).ToString("yyyy-MM-dd HH:mm:ss")) + @""", ""datetime_to"": """ + (DateTime.Parse(model.FechaFin).ToString("yyyy-MM-dd HH:mm:ss")) + @""", ""page"": " + page + @", ""columns"": """", ""options"": [""list_columns"", ""dispositions"", ""call_notes""]}";
                    break;
                case 2:
                    Data = @"{""datetime_from"": """ + (DateTime.Parse(model.FechaInicio).ToString("yyyy-MM-dd HH:mm:ss")) + @""", ""datetime_to"": """ + (DateTime.Parse(model.FechaFin).ToString("yyyy-MM-dd HH:mm:ss")) + @""", ""type"": ""daily"", ""filters"": []}";
                    break;
            }

            Token1 = Encryption.EncryptSHA256(Data);
            SecretHash = Encryption.EncryptSHA256(SecretKey);
            Token2 = Encryption.EncryptSHA256(ClientId + ":" + UserName + ":" + SecretHash);
            AuthToken = Encryption.EncryptSHA256(Token1 + ":" + Token2 + ":" + model.FechaSolicitud);

            return AuthToken;
        }

        public async Task<T> PostAsync<T>(MSincronizacion model, String token, Int32 page)
        {

            HttpClient client = new();

            String Api = String.Empty;
            String Data = String.Empty;

            switch (model.Option)
            {
                case 1:
                    Api = "https://api.ccc.uno/ws/CallHistory/Search";
                    Data = "AuthUsername = " + UserName + "\nAuthToken = " + token + "\nRequestDateTime = " + model.FechaSolicitud + "\nData =" + @"{""datetime_from"": """ + (DateTime.Parse(model.FechaInicio).ToString("yyyy-MM-dd HH:mm:ss")) + @""", ""datetime_to"": """ + (DateTime.Parse(model.FechaFin).ToString("yyyy-MM-dd HH:mm:ss")) + @""", ""page"": " + page + @", ""columns"": """", ""options"": [""list_columns"", ""dispositions"", ""call_notes""]}";
                    break;
                case 2:
                    Api = "https://api.ccc.uno/ws/Agent/getTimes";
                    Data = "AuthUsername = " + UserName + "\nAuthToken = " + token + "\nRequestDateTime = " + model.FechaSolicitud + "\nData =" + @"{""datetime_from"": """ + (DateTime.Parse(model.FechaInicio).ToString("yyyy-MM-dd HH:mm:ss")) + @""", ""datetime_to"": """ + (DateTime.Parse(model.FechaFin).ToString("yyyy-MM-dd HH:mm:ss")) + @""", ""type"": ""daily"", ""filters"": []}";
                    break;
            }

            T t = await ExecuteRequestAsync<T>(Api, Data);

            return t;
        }

        public static async Task<T> ExecuteRequestAsync<T>(string baseUrl, string body)
        {
            T t = JsonConvert.DeserializeObject<T>(string.Empty);

            HttpResponseMessage httpResponseMessage = await ExecuteResponseAsync(baseUrl, body);
            String responseBodyText = await httpResponseMessage.Content.ReadAsStringAsync(); ;

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                if (!String.IsNullOrEmpty(responseBodyText))
                {
                    t = JsonConvert.DeserializeObject<T>(responseBodyText);
                }
            }
            else
            {
                throw new Exception(responseBodyText);
            }

            return t;
        }

        public static async Task<HttpResponseMessage> ExecuteResponseAsync(string baseUrl, string body)
        {
            HttpClientHandler handler = new();
            HttpResponseMessage httpResponseMessage = new();

            using (HttpClient httpClient = new(handler))
            {
                UriBuilder uri = new(baseUrl);
                HttpContent httpContent = new StringContent(string.Empty);

                httpContent = new StringContent(content: body, encoding: Encoding.UTF8, mediaType: "text/plain");
                httpResponseMessage = await httpClient.PostAsync(uri.Uri, httpContent);
            }

            return httpResponseMessage;
        }

    }
}
