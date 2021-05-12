using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;

namespace ServiceDesk.Api.Systems.PersonalAreaSystem.DtoBuilders.Client
{
    public interface IClientDtoBuilder<TDto> : IDtoBuilder<Core.Entities.PersonalAreaSystem.Client, TDto>
        where TDto : class, IDto
    {

    }
}
