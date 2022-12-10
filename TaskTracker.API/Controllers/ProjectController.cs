using Microsoft.AspNetCore.Mvc;
using TaskTracker.API.Responses;
using TaskTracker.Core.Entities;
using TaskTracker.Core.Interfaces;
using TaskTracker.Core.QueryFilters;

namespace TaskTracker.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService ProjectService)
        {
            _projectService = ProjectService;
        }

        [HttpGet("getFilter")]
        public IActionResult GetFilter([FromQuery] ProjectQueryFilter filterQuery)
        {
            try
            {
                var service = _projectService.ProjectFilter(filterQuery);
                var response = new ApiResponse<IEnumerable<Project>>(service);
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
                var service = _projectService.Gets();
                var response = new ApiResponse<IEnumerable<Project>>(service);
                // return Ok(response);
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
                var service = await _projectService.Get(id);
                var response = new ApiResponse<Project>(service);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new APIError { Version = "1.0", ErrorMessage = ex.Message, StatusCode = "500" });
            }
        }

        [HttpGet("projectAndTasks")]
        public IActionResult BuildAndDepartaments(Guid id)
        {
            try
            {
                var service = _projectService.ProjectAndTasks(id);
                var response = new ApiResponse<IEnumerable<Project>>(service);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new APIError { Version = "1.0", ErrorMessage = ex.Message, StatusCode = "500" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Project item)
        {
            try
            {
                await _projectService.Insert(item);
                var response = new ApiResponse<Project>(item);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new APIError { Version = "1.0", ErrorMessage = ex.Message, StatusCode = "500" });
            }
        }

        [HttpPut]
        public IActionResult Put(Guid id, Project item)
        {
            try
            {
                item.Id = id;
                _projectService.Update(item);
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
            var project = await _projectService.Get(id);
            if (project is null)
            {
                return BadRequest("Project does not exist");
            }

            await _projectService.Delete(id);
            return Ok();
        }
    }
}
