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

        [HttpGet]
        [Route("BuildingInfo/GetMyBuilding")]
        public async Task<IActionResult> GetMyBuilding()
        {
            try {
                var user = this.User;

                if (user == null) {
                    return NotFound("User is null");
                }

                var token = user.FindFirst("jwtToken");

                if (token == null) {
                    return NotFound("Token is null");
                }

                using (var client = new HttpClient()) {
                    var uri = new Uri("https://api.smarthut.se/buildinginfo/getmybuilding");

                    client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", token.Value);

                    var response = await client.GetAsync(uri);

                    response.EnsureSuccessStatusCode();

                    string stringResponseBody = await response.Content.ReadAsStringAsync();

                    return Ok(stringResponseBody);
                }
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
    }
}