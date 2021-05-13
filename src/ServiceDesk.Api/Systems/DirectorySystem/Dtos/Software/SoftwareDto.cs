using ServiceDesk.Api.Systems.Common.Interfaces.Dto;

namespace ServiceDesk.Api.Systems.DirectorySystem.Dtos.Software
{
    public class SoftwareDto : IDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}
