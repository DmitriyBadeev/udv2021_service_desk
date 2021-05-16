using ServiceDesk.Api.Systems.Common.Interfaces.Dto;

namespace ServiceDesk.Api.Systems.DirectorySystem.Dtos.SoftwareModule
{
    public class SoftwareModuleDto : IDto
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public int SoftwareId { get; set; }
        public string Software { get; set; }
    }
}
