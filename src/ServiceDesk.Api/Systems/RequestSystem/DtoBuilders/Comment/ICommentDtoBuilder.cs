using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;

namespace ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Comment
{
    public interface ICommentDtoBuilder<TDto> : IDtoBuilder<Core.Entities.RequestSystem.Comment, TDto>
        where TDto : class, IDto
    {

    }
}
