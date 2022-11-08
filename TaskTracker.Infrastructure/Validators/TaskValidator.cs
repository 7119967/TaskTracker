using FluentValidation;
using MyTask = TaskTracker.Core.Entities.MyTask;

namespace TaskTracker.Infrastructure.Validators
{
    public class TaskValidator : AbstractValidator<MyTask>
    {
        public TaskValidator()
        {
            RuleFor(p => p.Name)
                .NotNull()
                .Length(1, 256);
        }
    }
}
