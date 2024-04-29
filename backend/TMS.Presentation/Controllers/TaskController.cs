using Microsoft.AspNetCore.Mvc;
using TMS.Application.Services;
using TMS.Domain.Entities;
using TMS.Domain.Models;

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
    public async Task<ActionResult> Get([FromQuery] TaskItemListRequest taskItemListRequest)
    {
        var res = await _taskService.RetrieveAllTasks(taskItemListRequest);
        if (res.IsError)
        {
            return BadRequest(res.Errors);
        }

        return Ok(res.Value.Items);
    }

    [HttpGet("{id}")]
    [ProducesResponseType<TaskItem>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Get(int id)
    {
        var res = await _taskService.GetTask(id);
        if (res.IsError)
        {
            if (res.FirstError.Type == ErrorOr.ErrorType.NotFound)
                return NotFound();
            else
                return BadRequest(res.Errors);
        }

        return Ok(res.Value);
    }

    [HttpPost()]
    [ProducesResponseType<TaskItem>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Post([FromBody] TaskItemCreateUpdateRequest taskItemCreateUpdateRequest)
    {
        var res = await _taskService.CreateTask(taskItemCreateUpdateRequest);
        if (res.IsError)
        {
            return BadRequest(res.Errors);
        }

        return Ok(res.Value);
    }

    [HttpPut("{id}")]
    [ProducesResponseType<TaskItem>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Put([FromBody] TaskItemCreateUpdateRequest taskItemCreateUpdateRequest, int id)
    {
        var res = await _taskService.UpdateTask(taskItemCreateUpdateRequest, id);
        if (res.IsError)
        {
            if (res.FirstError.Type == ErrorOr.ErrorType.NotFound)
                return NotFound();
            else
                return BadRequest(res.Errors);
        }

        return Ok(res.Value);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType<TaskItem>(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Delete(int id)
    {
        var res = await _taskService.DeleteTask(id);
        if (res.IsError)
        {
            if (res.FirstError.Type == ErrorOr.ErrorType.NotFound)
                return NotFound();
            else
                return BadRequest(res.Errors);
        }

        return NoContent();
    }

    [Route("progress")]
    [HttpGet]
    [ProducesResponseType<IEnumerable<TaskItem>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Progress()
    {
        var res = await _taskService.GetProgress();
        return Ok(res);
    }
}