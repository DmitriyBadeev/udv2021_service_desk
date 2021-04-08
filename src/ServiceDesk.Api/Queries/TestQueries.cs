using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType(Name = "Queries")]
    public class TestQueries
    {
        public string TestQuery()
        {
            return "Test response";
        }
        
        [Authorize]
        public string UserId([CurrentUserIdGlobalState] string userId)
        {
            return userId;
        }
        
        [Authorize]
        public string Secret()
        {
            return "secret";
        }
    }
}