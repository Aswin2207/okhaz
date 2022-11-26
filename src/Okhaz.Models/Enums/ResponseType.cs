namespace Okhaz.Models.Enums
{
    public enum ResponseType
    {
        Success,
        InternalException,
        Unauthorized,
        InvalidPassword,
        PreConditionFailed,
        NotFound = 404
    }
}
