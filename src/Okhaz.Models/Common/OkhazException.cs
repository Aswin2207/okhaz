using Okhaz.Models.Enums;
using System;

namespace Okhaz.Models.Common
{
    public class OkhazException : Exception
    {
        public ErrorDetails ErrorDetails;

        public OkhazException(ResponseType code, string message)
        {
            ErrorDetails = new ErrorDetails { Code = (int)code, Message = message };
        }
    }
}
