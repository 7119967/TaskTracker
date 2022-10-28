using TaskTracker.Core.Entities;
using TaskTracker.Core.QueryFilters;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Core.Interfaces
{
    public interface IProjectService
    {
        IEnumerable<Project> Gets();
        IEnumerable<Project> GetAll();
        Task<Project> Get(Guid id);
        Task Insert(Project item);
        void Update(Project item);
        Task Delete(Guid id);
        IEnumerable<Project> ProjectAndTasks(Guid id);
        IEnumerable<Project> ProjectFilter(ProjectQueryFilter filterQuery);
    }
}
