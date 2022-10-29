using FluentValidation;
using Task = TaskTracker.Core.Entities.Task;

namespace TaskTracker.Infrastructure.Validators
{
    public class TaskValidator : AbstractValidator<Task>
    {
        public TaskValidator()
        {
            RuleFor(p => p.Name)
                .NotNull()
                .Length(1, 256);
        }
    }
}
