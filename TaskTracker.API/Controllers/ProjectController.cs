using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTracker.API.Abstractions;
using TaskTracker.API.Models.Entities;

namespace TaskTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IRepository<Project> _repository;
        public ProjectController(IRepository<Project> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Project>> Get()
        {
            var projects = await _repository.GetAllAsync();
            return projects;
        }

        [HttpGet("{id}")]
        public async Task<Project?> Get(Guid id)
        {
            var project = await _repository.GetAsync(id);
            return project;
        }

        [HttpPost]
        public async Task<Project> Post([FromBody] Project entity)
        {
            entity.Id = Guid.NewGuid();
            await _repository.AddAsync(entity);
            return entity;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Project entity)
        {
            var project = await _repository.GetAsync(id);
            if (project is null)
            {
                return BadRequest("Project does not exist");
            }

            await _repository.UpdateAsync(entity);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var project = await _repository.GetAsync(id);
            if (project is null)
            {
                return BadRequest("Project does not exist");
            }

            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}
