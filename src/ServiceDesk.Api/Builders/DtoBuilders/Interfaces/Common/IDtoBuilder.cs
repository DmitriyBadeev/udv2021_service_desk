using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Dtos;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Api.Builders.DtoBuilders.Interfaces
{
    public interface IDtoBuilder<in TEntity, out TDto>
        where TEntity : class, IEntity
        where TDto : class, IDto
    {
        public TDto Build(TEntity entity);
    }
}
