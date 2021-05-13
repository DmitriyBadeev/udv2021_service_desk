using ServiceDesk.Api.Systems.RequestSystem.Dtos.RequestAttachment;

namespace ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.RequestAttachment
{
    public class RequestAttachmentDtoBuilder : IRequestAttachmentDtoBuilder<RequestAttachmentDto>
    {
        public RequestAttachmentDto Build(Core.Entities.RequestSystem.RequestAttachment entity)
        {
            var requestAttachmentDto = new RequestAttachmentDto()
            {
                Id = entity.Id,
                Name = entity.RealName,
                SizeMb = entity.SizeMb,
                Reference = entity.Reference
            };

            return requestAttachmentDto;
        }
    }
}
