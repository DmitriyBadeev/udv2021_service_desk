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
    }
}