using FluentValidation;

namespace TMS.Domain.Models
{
    public class TaskItemCreateUpdateRequestValidator : AbstractValidator<TaskItemCreateUpdateRequest>
    {
        public TaskItemCreateUpdateRequestValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskTitle);
            RuleFor(x => x.Description).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskDescription);
            RuleFor(x => x.Title).MaximumLength(256).WithMessage(Constants.Messages.MustProvideTaskTitle);
            RuleFor(x => x.Description).MaximumLength(1024).WithMessage(Constants.Messages.DescriptionShouldBe1024);
            RuleFor(x => x.Date).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskDate);
            RuleFor(x => x.Priority).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskPriority);
            RuleFor(x => x.Priority).IsInEnum().WithMessage(Constants.Messages.InvalidTaskPriority);
            RuleFor(x => x.Status).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskStatus);
            RuleFor(x => x.Status).IsInEnum().WithMessage(Constants.Messages.InvalidTaskStatus);
        }
    }
}
