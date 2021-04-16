using ServiceDesk.Api.Dtos;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Api.Builders.DtoBuilders.Interfaces
{
    public interface IDtoBuilderManager<out TEntity>
        where TEntity : class, IEntity
    {
        public TDtoBuilder GetDtoBuilder<TDtoBuilder, TDto>()
            where TDto : class, IDto
            where TDtoBuilder : IDtoBuilder<TEntity, TDto>;
    }
}
