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

        [Authorize(Roles = new[] {Constants.DEVELOPER_ROLE})]
        public string DeveloperMethod()
        {
            return "developer secret";
        }
        
        [Authorize(Roles = new[] {Constants.DEVELOPER_ROLE, Constants.CUSTOMER_ROLE})]
        public string CustomerMethod()
        {
            return "customer secret";
        }
        
        [Authorize]
        public string Secret()
        {
            return "secret";
        }
    }
}