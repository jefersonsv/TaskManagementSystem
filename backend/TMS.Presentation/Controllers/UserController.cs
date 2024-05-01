using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TMS.Domain.Entities;
using TMS.Domain.Models;
using TMS.Presentation.Extensions;

namespace TMS.Presentation.Controllers;

[ApiController]
[Route("/api/user")]
[Authorize(Policy = nameof(DenyAnonymousAuthorizationRequirement))]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IConfiguration _configuration;

    public UserController(ILogger<UserController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    [Route("token")]
    [AllowAnonymous]
    [HttpPost()]
    [ProducesResponseType<TaskItem>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public ActionResult Post([FromBody] LoginRequest loginRequest)
    {
        /*
         * For demonstration purpose is the token generation
         * Basically we need to have this logic at application (like the Task Service) and the username and password (hased) should be persisted on the database
         * Alternativelly, could be used Azure Entra ID, Oauth or any other Identity provider
         */

        var securitySettings = _configuration.GetSection(nameof(SecuritySettings)).Get<SecuritySettings>();

        if (securitySettings != null)
        {
            var secretKey = Encoding.UTF8.GetBytes(securitySettings.SecretKey);

            if (loginRequest.Username == "admin" && loginRequest.Password == "admin")
            {
                // Define token claims
                var claims = new[]
                {
                new Claim(ClaimTypes.Name, "Admin User"),
                new Claim(ClaimTypes.Email, "admin@admin.com"),
            };

                var securityKey = new SymmetricSecurityKey(secretKey);
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                // Create the JWT token
                var token = new JwtSecurityToken(
                    issuer: securitySettings.Issuer,
                    audience: securitySettings.Audience,
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(6),
                    signingCredentials: credentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return Ok(tokenString);
            }
        }

        return Unauthorized();
    }

    //[Route("token")]
    //[AllowAnonymous]
    //[HttpOptions()]
    //public ActionResult Options()
    //{
    //    return Ok();
    //}
}