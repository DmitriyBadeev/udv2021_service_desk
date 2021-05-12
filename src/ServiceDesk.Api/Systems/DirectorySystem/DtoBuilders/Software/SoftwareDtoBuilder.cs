using ServiceDesk.Api.Systems.DirectorySystem.Dtos.Software;

namespace ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.Software
{
    public class SoftwareDtoBuilder : ISoftwareDtoBuilder<SoftwareDto>
    {
        public SoftwareDto Build(Core.Entities.DirectorySystem.Software software)
        {
            var softwareDto = new SoftwareDto()
            { 
                Id = software.Id,
                Title = software.Title
            };

            return softwareDto;
        }
    }
}
