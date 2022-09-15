using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace API.AuthTest.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class SmartHutController :ControllerBase
    {
        
        [HttpGet]
        [Route("token")]
        public string GetMyToken()
        {
            var user = this.User;
            var token = user.FindFirst("jwtToken");
            return token.Value.ToString();
        }

    }
}