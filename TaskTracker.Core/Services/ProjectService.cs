using TaskTracker.Core.Entities;
using TaskTracker.Core.Interfaces;
using TaskTracker.Core.QueryFilters;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Project> Get(Guid id)
        {
            var res = await _unitOfWork.ProjectRepository.GetById(id);
            return res;
        }

        public IEnumerable<Project> Gets()
        {
            return _unitOfWork.ProjectRepository.GetAll();
        }

        public Task Insert(Project item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> ProjectAndTasks(Guid id)
        {
            var includes = new string[] { "Task"};
            var res = _unitOfWork.ProjectRepository.Find(x => x.Id == id, includes);
            return res;
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
