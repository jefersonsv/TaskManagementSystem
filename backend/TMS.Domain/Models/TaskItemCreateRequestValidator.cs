using FluentValidation;

namespace TMS.Domain.Models
{
    public class TaskItemCreateRequestValidator : AbstractValidator<TaskItemCreateRequest>
    {
        public TaskItemCreateRequestValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskTitle);
            RuleFor(x => x.Description).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskDescription);
            RuleFor(x => x.Priority).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskPriority);
            RuleFor(x => x.Date).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskDate);
            RuleFor(x => x.Priority).IsInEnum().WithMessage(Constants.Messages.InvalidTaskPriority);
        }
    }
}
