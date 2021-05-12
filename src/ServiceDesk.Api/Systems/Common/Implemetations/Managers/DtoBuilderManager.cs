using System;
using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Api.Systems.Common.Implemetations.Managers
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
