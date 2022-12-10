using TaskTracker.Core.Interfaces;
using TaskTracker.Infrastructure.Data;
using MyTask = TaskTracker.Core.Entities.MyTask;

namespace TaskTracker.Infrastructure.Repositories
{
    public class TaskRepository : BaseRepository<MyTask>, ITaskRepository
    {
        public TaskRepository(DatabaseContext context) : base(context) { }
    }
}
