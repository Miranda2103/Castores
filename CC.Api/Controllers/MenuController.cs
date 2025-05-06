using CC.Context;
using CC.Logic;
using CC.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace CC.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : Controller
    {
        private readonly ILogger<MenuController> _logger;
        private IWebHostEnvironment _host;
        private readonly LMenu _logic;
        MResponse _response;

        public MenuController(ILogger<MenuController> logger, IWebHostEnvironment env, DbContext dbContext)
        {
            _logger = logger;
            _host = env;
            _logic = new LMenu(dbContext);
            _response = new MResponse();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get([Required] Int32 option, [FromQuery] MMenu model)
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
        public async Task<IActionResult> Post(MMenu model)
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
        public async Task<IActionResult> Put(Int32 option, MMenu model)
        {
            try
            {
                _response.Success = await _logic.PutAsync(option, model);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(List<MMenu> model)
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
