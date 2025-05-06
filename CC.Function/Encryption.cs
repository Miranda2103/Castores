using System.Security.Cryptography;
using System.Text;

namespace CC.Function
{
    public class Encryption
    {

        public static String EncryptSHA1(String str)
        {
            SHA1 sha1 = SHA1.Create();
            ASCIIEncoding encoding = new();
            byte[]? stream;

            StringBuilder sb = new StringBuilder();
            stream = sha1.ComputeHash(encoding.GetBytes(str));

            for (int i = 0; i < stream.Length; i++)
            {
                sb.AppendFormat("{0:x2}", stream[i]);
            }

            return sb.ToString();
        }

        public static String EncryptSHA256(string text)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(text);
            SHA256Managed hashstring = new SHA256Managed();
            
            byte[] hash = hashstring.ComputeHash(bytes);
            string hashString = string.Empty;
            
            foreach (byte x in hash)
            {
                hashString += String.Format("{0:x2}", x);
            }
            
            return hashString;
        }

    }
}
