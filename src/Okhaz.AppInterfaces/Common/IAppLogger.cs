using System;

namespace Okhaz.AppInterfaces.Common
{
    public interface IAppLogger
    {
        void Error(string message);

        void Error(Exception exception, string message);

        void Fatal(string message);

        void Fatal(Exception exception, string message);

        void Info(string message);

        void Info(Exception exception, string message);

        void Verbose(string message);

        void Verbose(Exception exception, string message);

        void Warning(string message);

        void Warning(Exception exception, string message);
    }
}
