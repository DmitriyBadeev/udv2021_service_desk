using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.DirectorySystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.DirectorySystem
{
    public class SoftwareData : IFactoryData
    {
        public string Title { get; set; }
    }

    public class SoftwareFactory : ISoftwareFactory<SoftwareData>
    {
        public Software Create(SoftwareData data)
        {
            var software = new Software()
            {
                Title = data.Title
            };

            return software;
        }
    }
}
