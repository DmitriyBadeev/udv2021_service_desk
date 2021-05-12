using ServiceDesk.Api.Systems.Common.Interfaces.Dto;

namespace ServiceDesk.Api.Systems.RequestSystem.Dtos.RequestAttachment
{
    public class RequestAttachmentDto : IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SizeMb { get; set; }
        public string Reference { get; set; }
    }
}
