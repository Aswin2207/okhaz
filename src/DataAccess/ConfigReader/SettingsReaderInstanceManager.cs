using System;

namespace DataAccess.DAL.ConfigReader
{
    public class SettingsReaderInstanceManager
    {
        private static readonly Lazy<SettingsReader>
            lazy =
            new Lazy<SettingsReader>
                (() => new SettingsReader());

        private SettingsReaderInstanceManager()
        {
        }

        public static SettingsReader Instance
        { get { return lazy.Value; } }
    }
}
