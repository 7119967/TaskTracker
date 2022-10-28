using Task = TaskTracker.Core.Entities.Task;

namespace TaskTracker.Core.Interfaces
{
    public interface ITaskRepository : IRepository<Task>
    {
    }
}
