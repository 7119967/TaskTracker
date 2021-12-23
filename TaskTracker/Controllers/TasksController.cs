using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ILogger<TasksController> _logger;

        public TasksController(ILogger<TasksController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<string> GetAllItems()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        [Route("/[controller]/[action]/{id}")]
        public string GetItem(int id) 
        { 
            return $"value: {id}";
        }

        [HttpPost]
        public void CreateItem([FromBody] string value)
        { }

        [HttpPut]
        public void EditItem(int id, [FromBody] string value)
        { }

        [HttpDelete]
        public void RemoveItem(int id)
        { }

        //[HttpGet]
        //public string Get(int id)
        //{
        //    return $"value {id}";
        //}
    }
}
