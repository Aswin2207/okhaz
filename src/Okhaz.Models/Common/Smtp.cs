namespace Okhaz.Models.Common
{
    public class Smtp
    {
        public string EmailFrom { get; set; }
        public string Host { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Port { get; set; }
        public bool EnableSSL { get; set; }
    }
}
