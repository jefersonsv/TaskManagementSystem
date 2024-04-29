using Serilog;
using TMS.Application.Services;
using TMS.Presentation.Middlewares;

namespace TMS.Presentation.Extensions
{
    public static class LoggingBuilderExtensions
    {
        public static Type[] CategoriesToLog =
        {
            typeof(RegisterRequestsMiddleware)
        };

        public static Type[] CriticalUpdateToLog =
        {
            typeof(CriticalUpdateService)
        };

        public static void ConfigureLogs(this ILoggingBuilder loggingBuilder, IConfiguration configuration)
        {
            var categories = CategoriesToLog.Select(s => $"\"{s.FullName}\"");
            var critical = CriticalUpdateToLog.Select(s => $"\"{s.FullName}\"");

            var logRequestsRelativePath = configuration.GetValue<string?>("LogRequestsRelativePath") ?? "log/requests_.log";
            var logCriticalsRelativePath = configuration.GetValue<string?>("LogCriticalUpdateRelativePath") ?? "log/criticals_.log";

            var logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.Logger(lc => lc
                    .Filter.ByIncludingOnly(w => w.Properties.ContainsKey("SourceContext") && categories.Any(a => a.Contains(w.Properties["SourceContext"].ToString())))
                    .WriteTo.File(Path.Combine(Environment.CurrentDirectory, logRequestsRelativePath), rollingInterval: RollingInterval.Day))
                .WriteTo.Logger(lc => lc
                    .Filter.ByIncludingOnly(w => w.Properties.ContainsKey("SourceContext") && critical.Any(a => a.Contains(w.Properties["SourceContext"].ToString())))
                    .WriteTo.File(Path.Combine(Environment.CurrentDirectory, logCriticalsRelativePath), rollingInterval: RollingInterval.Day))
                .CreateLogger();

            loggingBuilder.AddSerilog(logger);
        }
    }
}
