using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Systems.Common.Interfaces.Handler
{
    public interface IGenericHandler<TEntity>
        where TEntity : class, IEntity
    {
        public void Create<TFactory, TEntityData>(TEntityData data, ServiceDeskDbContext context)
            where TFactory : class, IGenericFactory<TEntity, TEntityData>
            where TEntityData : class, IFactoryData;

        public TDto Get<TDtoBuilder, TDto>(int entityId, ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto;

        public TDto Get<TDtoBuilder, TDto>(Guid entityId, ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto;

        public IEnumerable<TDto> GetAll<TDtoBuilder, TDto>(ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto;

        public IEnumerable<TDto> Page<TDtoBuilder, TDto>(int pageNumber, int count, ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto;

        public TDto Edit<TDtoBuilder, TDto, TEntityData>(int entityId, TEntityData data, ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto
            where TEntityData : class;

        public TDto Edit<TDtoBuilder, TDto, TEntityData>(Guid entityId, TEntityData data, ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto
            where TEntityData : class;

        public void Delete(int entityId, ServiceDeskDbContext context, out bool isSuccess);

        public void Delete(Guid entityId, ServiceDeskDbContext context, out bool isSuccess);

        public IEnumerable<TDto> Query<TDtoBuilder, TDto>(Expression<Func<TEntity, bool>> sample,
            ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto;
    }
}
