using FluentValidation;

namespace TMS.Domain.Models
{
    public class TaskItemUpdateRequestValidator : AbstractValidator<TaskItemUpdateRequest>
    {
        public TaskItemUpdateRequestValidator()
        {
            RuleFor(x => x).SetValidator(new TaskItemCreateRequestValidator());
            RuleFor(x => x.Status).NotEmpty().WithMessage(Constants.Messages.MustProvideTaskStatus);
            RuleFor(x => x.Status).IsInEnum().WithMessage(Constants.Messages.InvalidTaskStatus);
        }
    }
}
