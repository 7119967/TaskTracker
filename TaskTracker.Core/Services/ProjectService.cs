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

        public async Task Delete(Guid id)
        {
            await _unitOfWork.ProjectRepository.Delete(id);
            _unitOfWork.Commit();
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

        public async Task Insert(Project item)
        {
            await _unitOfWork.ProjectRepository.Add(item);
            _unitOfWork.Commit();
        }

        public IEnumerable<Project> ProjectAndTasks(Guid id)
        {
            var includes = new string[] { "Task" };
            var res = _unitOfWork.ProjectRepository.Find(x => x.Id == id, includes);
            return res;
        }

        public IEnumerable<Project> ProjectFilter(ProjectQueryFilter filterQuery)
        {
            var project = _unitOfWork.ProjectRepository.GetAll();
            var response = this.FilterListProject(project, filterQuery);
            return response;
        }

        public void Update(Project item)
        {
            _unitOfWork.ProjectRepository.Update(item);
            _unitOfWork.Commit();
        }

        private IEnumerable<Project> FilterListProject(IEnumerable<Project> res, ProjectQueryFilter filterQuery)
        {
            IEnumerable<Project> filter = new List<Project>();

            if (filterQuery.Name != null)
            {
                filter = res.Where(x => x.Name == filterQuery.Name);
            }

            if (filterQuery.Status > 0)
            {
                filter = res.Where(x => x.Status == filterQuery.Status);
            }

            return filter;
        }
    }
}
