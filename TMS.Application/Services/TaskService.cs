using ErrorOr;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System;
using TMS.Domain.Entities;
using TMS.Domain.Models;
using TMS.Infrastructure.Database;

namespace TMS.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly SqlContext _sqlContext;

        public TaskService(SqlContext sqlContext)
        {
            _sqlContext = sqlContext;
        }

        public async Task<ErrorOr<int>> CreateTask(TaskItemCreateRequest taskItemCreateRequest)
        {
            var validator = new TaskItemCreateRequestValidator();
            var validationResult = validator.Validate(taskItemCreateRequest);

            if (!validationResult.IsValid)
            {
                return validationResult.Errors.Select(s => Error.Validation(description: s.ErrorMessage)).ToList();
            }

            var taskItem = taskItemCreateRequest.Adapt<TaskItem>();
            taskItem.Status = Status.Pending;

            await _sqlContext.AddAsync(taskItem);
            await _sqlContext.SaveChangesAsync();

            return taskItem!.Id!.Value;
        }

        public Task<string> DeleteTask()
        {
            throw new NotImplementedException();
        }

        public async Task<ErrorOr<TaskItem>> GetTask(int id)
        {
            var doc = await _sqlContext.TaskItems.SingleOrDefaultAsync(w => w.Id == id);
            if (doc is null)
            {
                return Error.NotFound(description: Domain.Constants.Messages.TaskNotFound);
            }

            return doc;
        }

        public async Task<TaskItem[]> RetrieveAllTasks() => await _sqlContext.TaskItems.ToArrayAsync();

        public async Task<ErrorOr<bool>> UpdateTask(TaskItemUpdateRequest taskItemUpdateRequest, int id)
        {
            var validator = new TaskItemUpdateRequestValidator();
            var validationResult = validator.Validate(taskItemUpdateRequest);

            if (!validationResult.IsValid)
            {
                return validationResult.Errors.Select(s => Error.Validation(description: s.ErrorMessage)).ToList();
            }

            var doc = await _sqlContext.TaskItems.FindAsync(id);
            if (doc is null)
            {
                return Error.NotFound(description: Domain.Constants.Messages.TaskNotFound);
            }

            doc = taskItemUpdateRequest.Adapt<TaskItem>();
            await _sqlContext.SaveChangesAsync();

            return true;
        }
    }
}
