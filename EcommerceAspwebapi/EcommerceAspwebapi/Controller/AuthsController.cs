using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Repositores.ServiceRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAspwebapi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthsController : ControllerBase
    {
        private readonly IServiceRepo _authservice;
        public AuthsController(IServiceRepo authService)
        {
            _authservice = authService;

        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }
            var result = await _authservice.Registerasync(model);
            if (!result.isAuthnticated)
            {
                return BadRequest(result.message);

            }
            return Ok(result);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Loginasync([FromBody] Login model)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }
            var result = await _authservice.LoginAsync(model);
            if (!result.isAuthnticated)
            {
                return BadRequest(result.message);

            }
            return Ok(result);
        }
    }
}
