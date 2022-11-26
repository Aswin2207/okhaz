using Okhaz.Models.Response.Branch;

namespace Okhaz.Models.Response.Account
{
    public class LoginResponse
    {
        public BranchDetails BranchInfo { get; set; }
        public bool IsAccountActive { get; set; }
        public UserDetails UserDetails { get; set; }
    }
}
