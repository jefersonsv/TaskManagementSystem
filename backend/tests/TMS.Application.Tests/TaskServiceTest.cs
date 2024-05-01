using Moq;
using TMS.Application.Services;
using TMS.Domain.Entities;
using TMS.Domain.Models;
using TMS.Infrastructure.Repository;

namespace TMS.Application.Tests
{
    public class TaskServiceTest
    {
        [Test]
        public async Task CreateMediumPriorityTaskSuccessfully()
        {
            var taskItemRepositoryMock = new Mock<ITaskItemRepository>();
            var criticalUpdateServiceMock = new Mock<ICriticalUpdateService>();
            var taskItemRepositoryMockObject = taskItemRepositoryMock.Object;

            taskItemRepositoryMock.Setup(a => a.Insert(It.IsAny<TaskItem>())).Callback<TaskItem>(a => a.Id = 1);

            var taskService = new TaskService(taskItemRepositoryMock.Object, criticalUpdateServiceMock.Object);

            var taskItemCreateUpdateRequest = new TaskItemCreateUpdateRequest()
            {
                Title = "Test",
                Description = "Test",
                Date = DateTime.Now,
                Priority = Priority.Medium,
                Status = Status.Pending
            };

            var res = await taskService.CreateTask(taskItemCreateUpdateRequest);

            Assert.IsFalse(res.IsError);
            Assert.That(res.Value, Is.EqualTo(1));
        }

        [Test]
        public async Task CreateHighPriorityTaskSuccessfully()
        {
            var taskItemRepositoryMock = new Mock<ITaskItemRepository>();
            var criticalUpdateServiceMock = new Mock<ICriticalUpdateService>();
            var taskItemRepositoryMockObject = taskItemRepositoryMock.Object;

            taskItemRepositoryMock.Setup(a => a.Insert(It.IsAny<TaskItem>())).Callback<TaskItem>(a => a.Id = 1);

            var taskService = new TaskService(taskItemRepositoryMock.Object, criticalUpdateServiceMock.Object);

            var taskItemCreateUpdateRequest = new TaskItemCreateUpdateRequest()
            {
                Title = "Test",
                Description = "Test",
                Date = DateTime.Now,
                Priority = Priority.High,
                Status = Status.Pending
            };

            var res = await taskService.CreateTask(taskItemCreateUpdateRequest);

            criticalUpdateServiceMock.Verify(x => x.Register(It.IsAny<TaskItem>()), Times.Once());
            Assert.IsFalse(res.IsError);
            Assert.That(res.Value, Is.EqualTo(1));
        }
    }
}