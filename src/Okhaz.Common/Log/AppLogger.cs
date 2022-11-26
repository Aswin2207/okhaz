using Okhaz.AppInterfaces.Common;
using Serilog;
using System;

namespace Okhaz.Common.Log
{
    public class AppLogger : IAppLogger
    {
        private readonly ILogger logger;

        public AppLogger(ILogger logger)
        {
            this.logger = logger;
        }

        public void Error(string message)
        {
            logger.Error(message);
        }

        public void Error(Exception exception, string message)
        {
            logger.Error(exception, message);
        }

        public void Fatal(string message)
        {
            logger.Fatal(message);
        }

        public void Fatal(Exception exception, string message)
        {
            logger.Fatal(exception, message);
        }

        public void Info(string message)
        {
            logger.Information(message);
        }

        public void Info(Exception exception, string message)
        {
            logger.Information(exception, message);
        }

        public void Verbose(string message)
        {
            logger.Verbose(message);
        }

        public void Verbose(Exception exception, string message)
        {
            logger.Verbose(exception, message);
        }

        public void Warning(string message)
        {
            logger.Warning(message);
        }

        public void Warning(Exception exception, string message)
        {
            logger.Warning(exception, message);
        }
    }
}
