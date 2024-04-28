using TMS.Domain.Constants;

namespace TMS.Infrastructure.GetEnvironment
{
    public static class Guard
    {
        public static bool IsDevelopment()
        {
#if DEBUG
            string? environment = Environment.GetEnvironmentVariable(EnvironmentVariableKeys.Environment);
            return environment == Environments.Development;
#else
    return false;
#endif
        }
    }
}
