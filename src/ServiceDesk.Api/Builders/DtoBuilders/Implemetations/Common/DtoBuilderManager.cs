using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Api.Builders.DtoBuilders.Implemetations.Common
{
    public class DtoBuilderManager<TEntity> : IDtoBuilderManager<TEntity>
        where TEntity : class, IEntity
    {
        public TDtoBuilder GetDtoBuilder<TDtoBuilder, TDto>()
            where TDto : class, IDto
            where TDtoBuilder : IDtoBuilder<TEntity, TDto>
        {
            var dtoBuilderType = typeof(TDtoBuilder);

            var dtoBuilder = (TDtoBuilder)Activator.CreateInstance(dtoBuilderType);

            return dtoBuilder;
        }
    }
}
