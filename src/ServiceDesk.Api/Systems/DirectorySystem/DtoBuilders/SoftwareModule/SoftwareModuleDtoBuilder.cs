using ServiceDesk.Api.Systems.DirectorySystem.Dtos.SoftwareModule;

namespace ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.SoftwareModule
{
    public class SoftwareModuleDtoBuilder : ISoftwareModuleDtoBuilder<SoftwareModuleDto>
    {
        public SoftwareModuleDto Build(Core.Entities.DirectorySystem.SoftwareModule softwareModule)
        {
            var softwareModuleDto = new SoftwareModuleDto()
            { 
                Id = softwareModule.Id,
                Software = softwareModule.Software.Title,
                Title = softwareModule.Title,
                SoftwareId = softwareModule.SoftwareId
            };

            return softwareModuleDto;
        }
    }
}
