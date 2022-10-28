using TaskTracker.Core.Entities;
using TaskTracker.Core.Interfaces;
using TaskTracker.Core.QueryFilters;

namespace TaskTracker.Core.Services
{
    public class ProjectService : IProjectService
    {
        public Task<Project> Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> Gets()
        {
            throw new NotImplementedException();
        }

        public Entities.Task Insert(Project item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> ProjectAndTasks(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> ProjectFilter(ProjectQueryFilter filterQuery)
        {
            throw new NotImplementedException();
        }

        public void Update(Project item)
        {
            throw new NotImplementedException();
        }
    }
}
