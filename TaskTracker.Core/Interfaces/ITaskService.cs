using TaskTracker.Core.QueryFilters;
using MyTask = TaskTracker.Core.Entities.MyTask;

namespace TaskTracker.Core.Interfaces
{
    public interface ITaskService
    {
        IEnumerable<MyTask> Gets();
        IEnumerable<MyTask> GetAll();
        Task<MyTask> Get(Guid id);
        Task Insert(MyTask item);
        void Update(MyTask item);
        Task Delete(Guid id);
        IEnumerable<MyTask> TaskFilter(TaskQueryFilter filterQuery);
    }
}
