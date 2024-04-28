using Microsoft.AspNetCore.Mvc;
using TMS.Application.Services;
using TMS.Domain.Entities;

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
    public async Task<ActionResult> Get()
    {
        var res = await _taskService.RetrieveAllTasks();
        return Ok(res);
    }

    [HttpGet("{id}")]
    [ProducesResponseType<TaskItem>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Get(int id)
    {
        var res = await _taskService.GetTask(id);
        if (res.IsError)
        {
            return BadRequest(res.Errors);
        }

        return Ok(res.Value);
    }

    [HttpPost()]
    [ProducesResponseType<TaskItem>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Post([FromBody] Domain.Models.TaskItemCreateRequest taskItemCreateRequest)
    {
        var res = await _taskService.CreateTask(taskItemCreateRequest);
        if (res.IsError)
        {
            return BadRequest(res.Errors);
        }

        return Ok(res.Value);
    }

    [HttpPut("{id}")]
    [ProducesResponseType<TaskItem>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Put([FromBody] Domain.Models.TaskItemUpdateRequest taskItemCreate, int id)
    {
        await _taskService.UpdateTask(taskItemCreate, id);
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