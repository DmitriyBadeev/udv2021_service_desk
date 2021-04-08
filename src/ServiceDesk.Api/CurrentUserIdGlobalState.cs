using HotChocolate;

namespace ServiceDesk.Api
{
    public class CurrentUserIdGlobalState : GlobalStateAttribute
    {
        public CurrentUserIdGlobalState() : base("currentUserId")
        {
        }
    }
}