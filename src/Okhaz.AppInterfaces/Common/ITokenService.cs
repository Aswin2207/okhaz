namespace Okhaz.AppInterfaces.Common
{
    public interface ITokenService
    {
        string CreateToken(string username, string branchId);
    }
}
