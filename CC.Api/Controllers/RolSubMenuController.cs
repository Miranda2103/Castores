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
    public class RolSubMenuController : Controller
    {
        private readonly ILogger<RolSubMenuController> _logger;
        private IWebHostEnvironment _host;
        private readonly LRolSubMenu _logic;
        MResponse _response;

        public RolSubMenuController(ILogger<RolSubMenuController> logger, IWebHostEnvironment env, DbContext dbContext)
        {
            _logger = logger;
            _host = env;
            _logic = new LRolSubMenu(dbContext);
            _response = new MResponse();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get([Required] Int32 option, [FromQuery] MRolSubMenu model)
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
        public async Task<IActionResult> Post(List<MRolSubMenu> model)
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
        public async Task<IActionResult> Put(Int32 option, MRolSubMenu model)
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
        public async Task<IActionResult> Delete(MRolSubMenu model)
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
