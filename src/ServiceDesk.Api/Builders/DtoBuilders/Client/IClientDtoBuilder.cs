using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos;

namespace ServiceDesk.Api.Builders.DtoBuilders.Client
{
    public interface IClientDtoBuilder<TDto> : IDtoBuilder<Core.Entities.PersonalAreaSystem.Client, TDto>
        where TDto : class, IDto
    {

    }
}
