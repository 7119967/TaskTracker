using MyTask = TaskTracker.Core.Entities.MyTask;

namespace TaskTracker.Core.Interfaces
{
    public interface ITaskRepository : IRepository<MyTask>
    {
    }
}
