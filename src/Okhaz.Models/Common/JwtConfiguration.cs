namespace Okhaz.Models.Common
{
    public class JwtConfiguration
    {
        public string Audience { get; set; }

        public int ClockSkewInMinutes { get; set; }
        public int ExpirationTimeInMinutes { get; set; }
        public string KeyName { get; set; }
        public string SecretKey { get; set; }
    }
}
