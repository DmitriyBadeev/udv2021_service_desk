using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.DirectorySystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.DirectorySystem
{
    public class SoftwareModuleData : IFactoryData
    {
        public string Title { get; set; }
        public int SoftwareId { get; set; }
    }

    public class SoftwareModuleFactory : ISoftwareModuleFactory<SoftwareModuleData>
    {
        public SoftwareModule Create(SoftwareModuleData data)
        {
            var softwareModule = new SoftwareModule()
            {
                Title = data.Title,
                SoftwareId = data.SoftwareId
            };

            return softwareModule;
        }
    }
}
