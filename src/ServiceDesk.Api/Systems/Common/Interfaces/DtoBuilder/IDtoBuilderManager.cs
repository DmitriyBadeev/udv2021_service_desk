using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder
{
    public interface IDtoBuilderManager<out TEntity>
        where TEntity : class, IEntity
    {
        public TDtoBuilder GetDtoBuilder<TDtoBuilder, TDto>()
            where TDto : class, IDto
            where TDtoBuilder : IDtoBuilder<TEntity, TDto>;
    }
}
