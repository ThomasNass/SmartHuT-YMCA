using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;
using System.Net.Http.Headers;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Services.Configure<CookiePolicyOptions>(options => {
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
    options.HandleSameSiteCookieCompatibility();
});

// Add services to the container.
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"));

builder.Services
  .Configure<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme,
    options => {
        options.Events = new OpenIdConnectEvents {
            // When the token is validated, store it as a claim so that it can.be retrieved 
            // from the user object later 
            OnTokenValidated = ctx => {
                var jwtToken = ctx.SecurityToken.RawData;

                if (ctx.Principal?.Identity != null) {
                    ((ClaimsIdentity)ctx.Principal.Identity).AddClaim(new Claim("jwtToken", jwtToken));
                    return Task.CompletedTask;
                }

                throw new NullReferenceException("Ctx.Principal or ctx.Principal.Identity is Null");
            }
        };
    });

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
    );

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();


app.Run();
