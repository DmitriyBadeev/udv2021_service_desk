using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ServiceDesk.Api.Builders.DtoBuilders.Implemetations.Common;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories;

namespace ServiceDesk.Api.Handlers
{
    public interface IGenericHandler<TEntity>
        where TEntity : class, IEntity
    {
        public TDto Create<TFactory, TDtoBuilder, TEntityData, TDto>(TEntityData data, ServiceDeskDbContext context)
            where TFactory : class, IGenericFactory<TEntity, TEntityData>
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TEntityData : class, IFactoryData
            where TDto : class, IDto;

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
