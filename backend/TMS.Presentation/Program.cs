using TMS.Application;
using TMS.Infrastructure;
using TMS.Presentation.Middlewares;
using TMS.Presentation.Extensions;


var builder = WebApplication.CreateBuilder(args);

// Learn more about configuring Sw
// agger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.ConfigureApplicationServices();

builder.Services.ConfigurePresentationServices();

builder.Services.ConfigureInfrastructureServices(builder.Configuration);

builder.Logging.ConfigureLogs(builder.Configuration);

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

app.UseCors("default");

app.UseMiddleware<RegisterRequestsMiddleware>();

app.Run();
