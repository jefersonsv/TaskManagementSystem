using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TMS.Application;
using TMS.Infrastructure;
using TMS.Infrastructure.Database;
using TMS.Presentation;
using TMS.Presentation.Filters;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using TMS.Presentation.Middlewares;
using TMS.Presentation.Extensions;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.




//// Configure Serilog
//loggerFactory.AddSerilog(builder =>
//{
//    builder.MinimumLevel.Information()  // Set minimum log level (optional)
//           .WriteTo.File("logfile.txt", rollingInterval: RollingInterval.Day);  // Write to file
//});


// Learn more about configuring Sw
// agger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.ConfigureApplicationServices();

builder.Services.ConfigurePresentationServices();

builder.Services.ConfigureInfrastructureServices(builder.Configuration);

builder.Logging.AddLogRequests(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<RegisterRequestsMiddleware>();

app.Run();
