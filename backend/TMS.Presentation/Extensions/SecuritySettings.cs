namespace TMS.Presentation.Extensions
{
    public class SecuritySettings
    {
        public required string SecretKey { get; set; }
        public required string Issuer { get; set; }
        public required string Audience { get; set; }
    }
}
