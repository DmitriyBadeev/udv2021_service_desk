using HotChocolate.Types;

namespace ServiceDesk.Api.Mutations
{
    [ExtendObjectType(Name = "Mutations")]
    public class TestMutations
    {
        public string TestMutation()
        {
            return "Test mutation";
        }
    }
}