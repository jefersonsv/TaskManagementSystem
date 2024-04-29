namespace TMS.Presentation.Middlewares
{
    public class RegisterRequestsMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RegisterRequestsMiddleware> _logger;

        public RegisterRequestsMiddleware(RequestDelegate next, ILogger<RegisterRequestsMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var verb = context.Request.Method;
            var path = context.Request.Path;

            _logger.LogInformation("Verb: {1} Endpoint Requested: {2}", new object[] { verb, path });

            await _next(context);
        }
    }
}
