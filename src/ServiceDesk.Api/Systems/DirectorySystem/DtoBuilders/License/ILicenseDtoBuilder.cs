using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;

namespace ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.License
{
    public interface ILicenseDtoBuilder<TDto> : IDtoBuilder<Core.Entities.DirectorySystem.License, TDto>
        where TDto : class, IDto
    {

    }
}
