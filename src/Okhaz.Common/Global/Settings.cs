using Microsoft.Extensions.Configuration;
using System;

namespace Okhaz.Common.Global
{
    public class Settings
    {
        public static IConfigurationSection _configuration;

        public Settings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("AppSettings");
            // Init.InitSettings(ReadStringValueFromConfig("ConnectionString", @"data
            // source=185.243.77.50;initial catalog=QTPPro;persist security info=True;user
            // id=SQLDBA;password=hq%65Y1h;multipleactiveresultsets=True;application name=EntityFramework"));
        }

        private static bool ReadBooleanValueFromConfig(string name, bool defaultVal)
        {
            try
            {
                string val = ReadStringValueFromConfig(name, "");
                if (!string.IsNullOrWhiteSpace(val))
                {
                    return bool.Parse(val);
                }
            }
            catch (Exception e)
            {
                //Logger.Log(e);
            }
            return defaultVal;
        }

        private static int ReadIntValueFromConfig(string name, int defaultVal)
        {
            try
            {
                string val = ReadStringValueFromConfig(name, "");
                if (!string.IsNullOrWhiteSpace(val))
                {
                    return int.Parse(val);
                }
            }
            catch (Exception e)
            {
                // Logger.Log(e);
            }
            return defaultVal;
        }

        private static string ReadStringValueFromConfig(string name, string defaultVal)
        {
            try
            {
                string val = _configuration.GetSection(name).Value;
                if (!string.IsNullOrWhiteSpace(val))
                {
                    return val;
                }
            }
            catch (Exception e)
            {
                //Logger.Log(e);
            }
            return defaultVal;
        }
    }
}
