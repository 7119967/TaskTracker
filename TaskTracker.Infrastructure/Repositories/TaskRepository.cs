using TaskTracker.Core.Entities;
using TaskTracker.Core.Interfaces;
using TaskTracker.Infrastructure.Data;
using Task = TaskTracker.Core.Entities.Task;

namespace TaskTracker.Infrastructure.Repositories
{
    public class TaskRepository : BaseRepository<Task>, ITaskRepository
    {
        public TaskRepository(DatabaseContext context) : base(context) { }
    }
}
