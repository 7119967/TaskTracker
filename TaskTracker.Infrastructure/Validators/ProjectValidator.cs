using FluentValidation;
using TaskTracker.Core.Entities;

namespace TaskTracker.Infrastructure.Validators
{
    public class ProjectValidator : AbstractValidator<Project>
    {
        public ProjectValidator()
        {
            RuleFor(p => p.Name)
                .NotNull()
                .Length(1, 256);
        }
    }
}
