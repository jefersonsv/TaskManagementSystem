using TMS.Domain.Entities;

namespace TMS.Domain.Models
{
    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
