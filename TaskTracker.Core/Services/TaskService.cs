using TaskTracker.Core.Interfaces;
using TaskTracker.Core.QueryFilters;
using MyTask = TaskTracker.Core.Entities.MyTask;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Core.Services
{
    public class TaskService : ITaskService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TaskService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Delete(Guid id)
        {
            await _unitOfWork.TaskRepository.Delete(id);
            _unitOfWork.Commit();
        }

        public async Task<MyTask> Get(Guid id)
        {
            var res = await _unitOfWork.TaskRepository.GetById(id);
            return res;
        }

        public IEnumerable<MyTask> GetAll()
        {
            var includes = new string[] { "Project" };
            var res = _unitOfWork.TaskRepository.GetAll(includes);
            return res;
        }

        public IEnumerable<MyTask> Gets()
        {
            return _unitOfWork.TaskRepository.GetAll();
        }

        public async Task Insert(MyTask item)
        {
            await _unitOfWork.TaskRepository.Add(item);
            _unitOfWork.Commit();
        }

        public IEnumerable<MyTask> TaskFilter(TaskQueryFilter filterQuery)
        {
            var task = _unitOfWork.TaskRepository.GetAll();
            var response = this.FilterListTask(task, filterQuery);
            return response;
        }

        public void Update(MyTask item)
        {
            _unitOfWork.TaskRepository.Update(item);
            _unitOfWork.Commit();
        }
        private IEnumerable<MyTask> FilterListTask(IEnumerable<MyTask> res, TaskQueryFilter filterQuery)
        {
            IEnumerable<MyTask> filter = new List<MyTask>();

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
