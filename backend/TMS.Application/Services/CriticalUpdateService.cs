using Microsoft.Extensions.Logging;
using TMS.Domain.Entities;

namespace TMS.Application.Services
{
    public class CriticalUpdateService : ICriticalUpdateService
    {
        private readonly ILogger<CriticalUpdateService> _logger;

        public CriticalUpdateService(ILogger<CriticalUpdateService> logger)
        {
            _logger = logger;
        }

        public void Register(TaskItem taskItem)
        {
            _logger.LogInformation("Critial update task: {0} ", taskItem.Id);
            // or save to redis
            // or create an event in a queue
            // or call another endpoint
        }
    }
}
