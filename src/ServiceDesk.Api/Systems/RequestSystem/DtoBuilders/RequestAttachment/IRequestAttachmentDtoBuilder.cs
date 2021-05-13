using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;

namespace ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.RequestAttachment
{
    public interface IRequestAttachmentDtoBuilder<TDto> : IDtoBuilder<Core.Entities.RequestSystem.RequestAttachment, TDto>
        where TDto : class, IDto
    {

    }
}
