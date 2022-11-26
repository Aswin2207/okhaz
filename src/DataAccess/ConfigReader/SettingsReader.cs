using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace DataAccess.DAL.ConfigReader
{
    public class SettingsReader
    {
        public readonly string _connectionString = string.Empty;

        public SettingsReader()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);

            var root = configurationBuilder.Build();
            _connectionString = root["AppSettings:ConnectionString"];
        }

        public string ConnectionString
        {
            get => _connectionString;
        }
    }
}
