using Microsoft.AspNetCore.Mvc;
using TMS.Application.Services;
using TMS.Domain.Entities;
using TMS.Presentation.Models;

namespace TMS.Presentation.Controllers;

[ApiController]
[Route("/api/tasks")]
public class TaskController : ControllerBase
{
    private readonly ILogger<TaskController> _logger;
    private readonly ITaskService _taskService;

    public TaskController(ILogger<TaskController> logger, ITaskService taskService)
    {
        _logger = logger;
        _taskService = taskService;
    }

    [HttpGet]
    [ProducesResponseType<IEnumerable<TaskItem>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Get()
    {
        //var res = _taskService.RetrieveAllTasks();
        throw new Exception();
        //return Ok(res);
    }

    [HttpGet("{id}")]
    [ProducesResponseType<TaskItem>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Get(int id)
    {
        if (id < 10)
        {
            return Ok(new TaskItem());
        }
        else
        {
            return Problem(detail: Constants.Messages.TaskNotFound, statusCode: 404);
        }
    }

    [HttpPost()]
    [ProducesResponseType<TaskItem>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Post([FromBody] TaskItemCreate taskItemCreate)
    {
        var taskItem = new TaskItem();
        return CreatedAtAction(nameof(TaskItem), new { id = 1 });
    }

    [HttpPut("{id}")]
    [ProducesResponseType<TaskItem>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Put([FromBody] TaskItemCreate taskItemCreate, int id)
    {
        var taskItem = new TaskItem();
        return Ok();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType<TaskItem>(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Delete(int id)
    {
        return NoContent();
    }
}