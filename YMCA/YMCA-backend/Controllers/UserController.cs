using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

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

        [HttpGet]
        [Route("signout")]
        public async Task logOut()
        {
            var prop = new AuthenticationProperties()
            {
                RedirectUri = "/"   //Make a redirect 
            };
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme, prop);
            await HttpContext.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme,prop);

        }
    }
}