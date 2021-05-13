using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;

namespace ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.Software
{
    public interface ISoftwareDtoBuilder<TDto> : IDtoBuilder<Core.Entities.DirectorySystem.Software, TDto>
        where TDto : class, IDto
    {

    }
}
