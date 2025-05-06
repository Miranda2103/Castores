using CC.Context;
using CC.Logic;
using CC.Model;
using Microsoft.AspNetCore.Mvc;

namespace CC.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : Controller
    {
        private readonly LToken _logic;
        MResponse _response;

        public TokenController(IConfiguration configuration, DbContext dbContext)
        {
            _logic = new LToken(configuration, dbContext);
            _response = new MResponse();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Post(MAutenticacion model)
        {
            try
            {
                _response = await _logic.Post(model);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

    }
}
