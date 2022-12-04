using Microsoft.AspNetCore.Mvc;
using TaskTracker.API.Responses;
using TaskTracker.Core.Interfaces;
using TaskTracker.Core.QueryFilters;
using TaskTracker.Core.Services;
using MyTask = TaskTracker.Core.Entities.MyTask;

namespace TaskTracker.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService TaskService)
        {
            _taskService = TaskService;
        }

        [HttpGet("getFilter")]
        public IActionResult GetFilter([FromQuery] TaskQueryFilter filterQuery)
        {
            try
            {
                var service = _taskService.TaskFilter(filterQuery);
                var response = new ApiResponse<IEnumerable<MyTask>>(service);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new APIError { Version = "1.0", ErrorMessage = ex.Message, StatusCode = "500" });
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var service = _taskService.Gets();
                var response = new ApiResponse<IEnumerable<MyTask>>(service);
                //return Ok(response);
                return Ok(service);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new APIError { Version = "1.0", ErrorMessage = ex.Message, StatusCode = "500" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                var service = await _taskService.Get(id);
                var response = new ApiResponse<MyTask>(service);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new APIError { Version = "1.0", ErrorMessage = ex.Message, StatusCode = "500" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(MyTask item)
        {
            try
            {
                await _taskService.Insert(item);
                var response = new ApiResponse<MyTask>(item);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new APIError { Version = "1.0", ErrorMessage = ex.Message, StatusCode = "500" });
            }
        }

        [HttpPut]
        public IActionResult Put(Guid id, MyTask item)
        {
            try
            {
                item.Id = id;
                _taskService.Update(item);
                var response = new ApiResponse<bool>(true);

                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new APIError { Version = "1.0", ErrorMessage = ex.Message, StatusCode = "500" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var task = await _taskService.Get(id);
            if (task is null)
            {
                return BadRequest("Task does not exist");
            }

            await _taskService.Delete(id);
            return Ok();
        }
    }
}
