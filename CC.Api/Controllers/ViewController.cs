using CC.Context;
using CC.Logic;
using CC.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CC.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ViewController : Controller
    {
        private readonly ILogger<ViewController> _logger;
        private IWebHostEnvironment _host;
        private readonly LView _logic;
        MResponse _response;

        public ViewController(ILogger<ViewController> logger, IWebHostEnvironment env, DbContext dbContext)
        {
            _logger = logger;
            _host = env;
            _logic = new LView(dbContext);
            _response = new MResponse();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewUsuario([Required] Int32 option, [FromQuery] MViewUsuario model)
        {
            try
            {
                _response.Data = await _logic.GetViewUsuarioAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewRol([Required] Int32 option, [FromQuery] MViewRol model)
        {
            try
            {
                _response.Data = await _logic.GetViewRolAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewMenu([Required] Int32 option, [FromQuery] MViewMenu model)
        {
            try
            {
                _response.Data = await _logic.GetViewMenuAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewRolMenu([Required] Int32 option, [FromQuery] MViewRolMenu model)
        {
            try
            {
                _response.Data = await _logic.GetViewRolMenuAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewSubMenu([Required] Int32 option, [FromQuery] MViewSubMenu model)
        {
            try
            {
                _response.Data = await _logic.GetViewSubMenuAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewRolSubMenu([Required] Int32 option, [FromQuery] MViewRolSubMenu model)
        {
            try
            {
                _response.Data = await _logic.GetViewRolSubMenuAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewProductoEntrada([Required] Int32 option, [FromQuery] MViewProductoEntrada model)
        {
            try
            {
                _response.Data = await _logic.GetViewProductoEntradaAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewProductoSalida([Required] Int32 option, [FromQuery] MViewProductoSalida model)
        {
            try
            {
                _response.Data = await _logic.GetViewProductoSalidaAsync(option, model);
                _response.Success = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message.ToString();
                return BadRequest(_response);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetViewProductoHistorial([Required] Int32 option, [FromQuery] MViewProductoHistorial model)
        {
            try
            {
                _response.Data = await _logic.GetViewProductoHistorialAsync(option, model);
                _response.Success = true;

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
