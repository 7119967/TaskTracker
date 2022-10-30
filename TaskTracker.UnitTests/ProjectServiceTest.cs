using Moq;
using TaskTracker.Core.Entities;
using TaskTracker.Core.Interfaces;
using TaskTracker.Core.Services;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.UnitTests
{
    public class ProjectServiceTest
    {
        private readonly ProjectService _projectService;
        private readonly Mock<IUnitOfWork> _unitOfWork = new Mock<IUnitOfWork>();

        public ProjectServiceTest()
        {
            _projectService = new ProjectService(_unitOfWork.Object);
        }

        [Fact]
        public async Task Get_By_Id()
        {
            //Arange
            var id = Guid.NewGuid();
            var project = new Project();
            project.Id = id;

            _unitOfWork.Setup(t => t.ProjectRepository.GetById(id)).ReturnsAsync(project);
            //Act
            var res = await _projectService.Get(id);
            //Asert
            Assert.Equal(id, res.Id);
        }

        [Fact]
        public void Get_Departament_All()
        {
            var objectsList = new List<Project>() {
                new  Project{
                Name = "Project Name 1",
                Status = Core.Enums.ProjectStatus.NotStarted,
                Create = DateTime.Now,
                },
                new  Project{
                Name = "Project Name 2",
                Status = Core.Enums.ProjectStatus.Active,
                Create = DateTime.Now 
                },
                new  Project{
                Name = "Project Name 3",
                Status = Core.Enums.ProjectStatus.Completed,
                Create = DateTime.Now
                }
            };
        
            _unitOfWork.Setup<IEnumerable<Project>>(
                rep => rep.ProjectRepository.GetAll()
            ).Returns((objectsList));

            var res = _projectService.Gets();

            Assert.NotEmpty(res);
        }

        [Fact]
        public async Task Post_Departament()
        {
            try
            {
                Project project = new Project
                {
                    Name = "Project Name 1",
                    Status = Core.Enums.ProjectStatus.NotStarted,
                    Create = DateTime.Now
                };

                _unitOfWork.Setup(
                   rep => rep.ProjectRepository.Add(project)
               );

                await _projectService.Insert(project);
                Assert.NotNull(project);
            }
            catch (Exception ex)
            {
                Assert.Throws<Exception>(() => ex.Message);
            }
        }
    }
}