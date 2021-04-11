using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType(Name = "Queries")]
    public class TestQueries
    {
        const string DEVELOPER_ROLE = "DEVELOPER";
        const string CUSTOMER_ROLE = "CUSTOMER";
        const string OWNER_ROLE = "OWNER";
        
        public string TestQuery()
        {
            return "Test response";
        }
        
        [Authorize]
        public string UserId([CurrentUserIdGlobalState] string userId)
        {
            return userId;
        }

        [Authorize(Roles = new[] {DEVELOPER_ROLE})]
        public string DeveloperMethod()
        {
            return "developer secret";
        }
        
        [Authorize(Roles = new[] {DEVELOPER_ROLE, CUSTOMER_ROLE})]
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