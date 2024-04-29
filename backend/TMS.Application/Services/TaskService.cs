using ErrorOr;
using Mapster;
using TMS.Domain.Entities;
using TMS.Domain.Models;
using TMS.Infrastructure.Repository;

namespace TMS.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly ICriticalUpdateService _criticalUpdateService;
        private readonly ITaskItemRepository _taskItemRepository;

        public TaskService(ITaskItemRepository taskItemRepository, ICriticalUpdateService criticalUpdateService)
        {
            _taskItemRepository = taskItemRepository;
            _criticalUpdateService = criticalUpdateService;
        }

        public async Task<ErrorOr<int>> CreateTask(TaskItemCreateUpdateRequest taskItemCreateRequest)
        {
            var validator = new TaskItemCreateUpdateRequestValidator();
            var validationResult = validator.Validate(taskItemCreateRequest);

            if (!validationResult.IsValid)
            {
                return validationResult.Errors.Select(s => Error.Validation(description: s.ErrorMessage)).ToList();
            }

            var taskItem = taskItemCreateRequest.Adapt<TaskItem>();
            await _taskItemRepository.Insert(taskItem);

            if (taskItem.Priority == Priority.High)
            {
                _criticalUpdateService.Register(taskItem);
            }

            return taskItem!.Id!.Value;
        }

        public async Task<ErrorOr<bool>> DeleteTask(int id)
        {
            var doc = await _taskItemRepository.GetById(id);
            if (doc is null)
            {
                return Error.NotFound(description: Domain.Constants.Messages.TaskNotFound);
            }

            await _taskItemRepository.Delete(doc);
            return true;
        }

        public async Task<ErrorOr<TaskItem>> GetTask(int id)
        {
            var doc = await _taskItemRepository.GetById(id);
            if (doc is null)
            {
                return Error.NotFound(description: Domain.Constants.Messages.TaskNotFound);
            }

            return doc;
        }

        public async Task<ErrorOr<TaskItemListResponse>> RetrieveAllTasks(TaskItemListRequest taskItemListRequest)
        {
            var validator = new TaskItemListRequestValidator();
            var validationResult = validator.Validate(taskItemListRequest);

            if (!validationResult.IsValid)
            {
                return validationResult.Errors.Select(s => Error.Validation(description: s.ErrorMessage)).ToList();
            }

            var skip = (taskItemListRequest.Page - 1) * taskItemListRequest.PageSize;
            var items = await _taskItemRepository.RetrieveAllTasks(taskItemListRequest, skip);
            var total = await _taskItemRepository.CountTasks(taskItemListRequest);
            var totalPages = Convert.ToInt32(Math.Ceiling(Convert.ToDouble(total) / taskItemListRequest.PageSize));
            var res = new TaskItemListResponse()
            {
                Items = items,
                Page = taskItemListRequest.Page,
                Total = total,
                TotalPages = totalPages
            };

            return res;
        }

        public async Task<TaskProgress[]> GetProgress() => await _taskItemRepository.GetProgress();

        public async Task<ErrorOr<bool>> UpdateTask(TaskItemCreateUpdateRequest taskItemCreateUpdateRequest, int id)
        {
            var validator = new TaskItemCreateUpdateRequestValidator();
            var validationResult = validator.Validate(taskItemCreateUpdateRequest);

            if (!validationResult.IsValid)
            {
                return validationResult.Errors.Select(s => Error.Validation(description: s.ErrorMessage)).ToList();
            }

            var doc = await _taskItemRepository.GetById(id);
            if (doc is null)
            {
                return Error.NotFound(description: Domain.Constants.Messages.TaskNotFound);
            }

            doc.Status = taskItemCreateUpdateRequest.Status;
            doc.Date = taskItemCreateUpdateRequest.Date;
            doc.Description = taskItemCreateUpdateRequest.Description;
            doc.Priority = taskItemCreateUpdateRequest.Priority;
            doc.Title = taskItemCreateUpdateRequest.Title;

            await _taskItemRepository.SaveChanges();

            if (doc.Priority == Priority.High)
            {
                _criticalUpdateService.Register(doc);
            }

            return true;
        }
    }
}
