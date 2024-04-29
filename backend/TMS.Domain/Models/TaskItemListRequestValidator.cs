using FluentValidation;

namespace TMS.Domain.Models
{
    public class TaskItemListRequestValidator : AbstractValidator<TaskItemListRequest>
    {
        public TaskItemListRequestValidator()
        {
            RuleFor(x => x.Priority).IsInEnum().WithMessage(Constants.Messages.InvalidTaskPriority);
            RuleFor(x => x.Status).IsInEnum().WithMessage(Constants.Messages.InvalidTaskStatus);
        }
    }
}
