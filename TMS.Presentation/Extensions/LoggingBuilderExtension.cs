using Serilog;
using TMS.Presentation.Middlewares;

namespace TMS.Presentation.Extensions
{
    public static class LoggingBuilderExtensions
    {
        public static Type[] CategoriesToLog =
        {
            typeof(RegisterRequestsMiddleware)
        };

        public static void AddLogRequests(this ILoggingBuilder loggingBuilder, IConfiguration configuration)
        {
            var categories = CategoriesToLog.Select(s => $"\"{s.FullName}\"");
            var logRequestsRelativePath = configuration.GetValue<string?>("LogRequestsRelativePath") ?? "log/log_.log";
            var logPath = Path.Combine(Environment.CurrentDirectory, logRequestsRelativePath);

            var logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .Filter.ByIncludingOnly(w => w.Properties.ContainsKey("SourceContext") && categories.Any(a => a.Contains(w.Properties["SourceContext"].ToString())))
                .WriteTo.File(logPath, rollingInterval: RollingInterval.Day)
                .CreateLogger();

            loggingBuilder.AddSerilog(logger);
        }
    }
}
