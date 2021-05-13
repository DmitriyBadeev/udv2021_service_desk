using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder
{
    public interface IDtoBuilder<in TEntity, out TDto>
        where TEntity : class, IEntity
        where TDto : class, IDto
    {
        public TDto Build(TEntity entity);
    }
}
