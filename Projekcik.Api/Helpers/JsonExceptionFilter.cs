using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Projekcik.Api.Helpers
{
    public class JsonExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var result = new ObjectResult(SerializeException(context.Exception))
            {
                StatusCode = 500
            };

            context.Result = result;
        }

        private object SerializeException(Exception e)
        {
            if (e == null)
                return null;

            return new
            {
                code = 500,
                message = "A server error occurred.",
                detailedMessage = e.Message,
                innerException = SerializeException(e.InnerException)
            };
        }
    }
}