using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;

namespace ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.SoftwareModule
{
    public interface ISoftwareModuleDtoBuilder<TDto> : IDtoBuilder<Core.Entities.DirectorySystem.SoftwareModule, TDto>
        where TDto : class, IDto
    {

    }
}
