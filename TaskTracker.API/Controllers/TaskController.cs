using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTracker.API.Abstractions;
using TaskTracker.API.Models.Entities;
using Task = TaskTracker.API.Models.Entities.Task;

namespace TaskTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IRepository<Task> _repository;
        public TaskController(IRepository<Task> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Task>> Get()
        {
            var tasks = await _repository.GetAllAsync();
            return tasks;
        }

        [HttpGet("{id}")]
        public async Task<Task?> Get(Guid id)
        {
            var task = await _repository.GetAsync(id);
            return task;
        }

        [HttpPost]
        public async Task<Task> Post([FromBody] Task entity)
        {
            entity.Id = Guid.NewGuid();
            await _repository.AddAsync(entity);
            return entity;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Task entity)
        {
            var task = await _repository.GetAsync(id);
            if (task is null)
            {
                return BadRequest("Task does not exist");
            }

            await _repository.UpdateAsync(entity);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var task = await _repository.GetAsync(id);
            if (task is null)
            {
                return BadRequest("Task does not exist");
            }

            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}
