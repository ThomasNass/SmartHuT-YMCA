using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Security.Claims;

namespace API.AuthTest.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController :ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var user = new {
                Email = this.User.FindFirstValue(ClaimTypes.Email),
                Token = this.User.FindFirst("jwtToken")?.Value
            };

            return Ok(user);
        }
    }
}