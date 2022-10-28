using System.Collections.Generic;
using System.Threading.Tasks;
using TaskTracker.Core.Entities;
using TaskTracker.Core.QueryFilters;

namespace TaskTracker.Core.Interfaces
{
    internal interface IProjectService
    {
        IEnumerable<Project> Gets();
        Task<Project> Get(int id);
        Task Insert(Project item);
        void Update(Project item);
        IEnumerable<Project> ProjectAndTasks(int id);
        IEnumerable<Project> ProjectFilter(ProjectQueryFilter filterQuery);
    }
}
