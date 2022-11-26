namespace Okhaz.Models.Common
{
    public class UserIdentity
    {
        private string accessToken;

        public string AccessToken
        {
            get
            {
                return accessToken;
            }
            set
            {
                var input = value;
                if (input.StartsWith("bearer ", ignoreCase: true, culture: null))
                {
                    var results = input.Split();

                    if (results.Length == 2)
                    {
                        IsBearerToken = true;
                        accessToken = results[1];
                    }
                }
            }
        }

        public string BranchId { get; set; }
        public string HostName { get; set; }
        public bool IsAuthenticated { get; set; }
        public bool IsBearerToken { get; private set; }

        public string UserId { get; set; }
        public string Username { get; set; }
    }
}
