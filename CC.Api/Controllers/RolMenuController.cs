using CC.Context;
using CC.Logic;
using CC.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System.ComponentModel.DataAnnotations;

namespace CC.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RolMenuController : Controller
    {
        private readonly ILogger<RolMenuController> _logger;
        private IWebHostEnvironment _host;
        private readonly LRolMenu _logic;
        MResponse _response;

        public RolMenuController(ILogger<RolMenuController> logger, IWebHostEnvironment env, DbContext dbContext)
        {
            _logger = logger;
            _host = env;
            _logic = new LRolMenu(dbContext);
            _response = new MResponse();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get([Required] Int32 option, [FromQuery] MRolMenu model)
        {
            try
            {
                _response.Data = await _logic.GetAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Post(List<MRolMenu> model)
        {
            try
            {
                _response.Success = await _logic.PostAsync(model);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Put(Int32 option, MRolMenu model)
        {
            try
            {
                _response.Success = await _logic.PutAsync(option,model);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(MRolMenu model)
        {
            try
            {
                _response.Success = await _logic.DeleteAsync(model);
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
