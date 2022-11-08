using Moq;
using TaskTracker.Core.Interfaces;
using TaskTracker.Core.Services;
using MyTask = TaskTracker.Core.Entities.MyTask;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.UnitTests
{
    public class TaskServiceTest
    {
        private readonly TaskService _taskService;
        private readonly Mock<IUnitOfWork> _unitOfWork = new Mock<IUnitOfWork>();

        public TaskServiceTest()
        {
            _taskService = new TaskService(_unitOfWork.Object);
        }

        [Fact]
        public async Task Get_By_Id()
        {
            //Arange
            var id = Guid.NewGuid();
            var task = new MyTask();
            task.Id = id;

            _unitOfWork.Setup(t => t.TaskRepository.GetById(id)).ReturnsAsync(task);

            //Act
            var res = await _taskService.Get(id);
            //Asert
            Assert.Equal(id, res.Id);
        }

        [Fact]
        public void Get_Task_All()
        {
            var objectsList = new List<MyTask>() {
                new  MyTask{
                Name = "MyTask Name 1",
                Status = Core.Enums.TaskStatus.ToDo,
                Create = DateTime.Now,
                },
                new  MyTask{
                Name = "MyTask Name 2",
                Status = Core.Enums.TaskStatus.InProgress,
                Create = DateTime.Now
                },
                new  MyTask{
                Name = "MyTask Name 3",
                Status = Core.Enums.TaskStatus.Done,
                Create = DateTime.Now
                }
            };

            _unitOfWork.Setup<IEnumerable<MyTask>>(
                rep => rep.TaskRepository.GetAll()
            ).Returns((objectsList));

            var res = _taskService.Gets();

            Assert.NotEmpty(res);
        }

        [Fact]
        public async Task Post_Task()
        {
            try
            {
                MyTask task = new MyTask
                {
                    Name = "MyTask Name 1",
                    Status = Core.Enums.TaskStatus.ToDo,
                    Create = DateTime.Now,
                };

                _unitOfWork.Setup(
                   rep => rep.TaskRepository.Add(task)
               );

                await _taskService.Insert(task);
                Assert.NotNull(task);
            }
            catch (Exception ex)
            {
                Assert.Throws<Exception>(() => ex.Message);
            }
        }
    }
}
