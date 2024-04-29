using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace TMS.Presentation.Filters
{
    public class UnexpectedErrorFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            context.Result = new JsonResult(new {
                Message = Constants.Messages.UnexpectedError
            })
            {
                StatusCode = 500
            };
            //var exception = context.Exception;
            //if (exception is NotFoundException e)
            //{
            //    context.Result = new JsonResult(e.Message)
            //    {
            //        StatusCode = (int)HttpStatusCode.NotFound;
            //};
        }
    }
}
