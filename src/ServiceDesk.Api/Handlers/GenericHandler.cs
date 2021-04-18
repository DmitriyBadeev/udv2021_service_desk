using System;
using System.Collections.Generic;
using System.Linq;
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
    public class GenericHandler<TEntity> : IGenericHandler<TEntity>
        where TEntity : class, IEntity
    {
        public TDto Create<TFactory, TDtoBuilder, TEntityData, TDto>(TEntityData data, ServiceDeskDbContext context)
            where TFactory : class, IGenericFactory<TEntity, TEntityData>
            where TDtoBuilder: class, IDtoBuilder<TEntity, TDto>
            where TEntityData : class, IFactoryData
            where TDto : class, IDto
        {
            var entity = CreateEntity<TFactory, TEntityData>(data);

            var entities = context.Set<TEntity>();
            entities.Add(entity);
            context.SaveChanges();
            
            var dto = CreateDto<TDtoBuilder, TDto>(entity);

            return dto;
        }

        private TEntity CreateEntity<TFactory, TEntityData>(TEntityData data)
            where TFactory : class, IGenericFactory<TEntity, TEntityData>
            where TEntityData : class, IFactoryData
        {
            var factoryManager = new FactoryManager<TEntity, TEntityData>();

            var factory = factoryManager.GetFactory<TFactory>();

            var entity = factory.Create(data);

            return entity;
        }

        private TDto CreateDto<TDtoBuilder, TDto>(TEntity entity)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto
        {
            var dtoBuilderManager = new DtoBuilderManager<TEntity>();

            var dtoBuilder = dtoBuilderManager.GetDtoBuilder<TDtoBuilder, TDto>();

            var dto = dtoBuilder.Build(entity);

            return dto;
        }

        public TDto Get<TDtoBuilder, TDto>(int entityId, ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto
        {
            var entities = context.Set<TEntity>();

            var entity = entities.Find(entityId);

            if (entity != null)
            {
                var dto = CreateDto<TDtoBuilder, TDto>(entity);

                return dto;
            }

            return null;
        }

        public IEnumerable<TDto> GetAll<TDtoBuilder, TDto>(ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto
        {
            var entities = context
                .Set<TEntity>()
                .AsEnumerable();

            var dtos = entities.Select(CreateDto<TDtoBuilder, TDto>);

            return dtos;
        }

        public IEnumerable<TDto> Page<TDtoBuilder, TDto>(int pageNumber, int count, ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto
        {
            var entities = context
                .Set<TEntity>()
                .Skip(pageNumber * count)
                .Take(count)
                .AsEnumerable();

            var dtos = entities.Select(CreateDto<TDtoBuilder, TDto>);

            return dtos;
        }

        public TDto Edit<TDtoBuilder, TDto, TEntityData>(int entityId, TEntityData data, ServiceDeskDbContext context)
            where TDtoBuilder : class, IDtoBuilder<TEntity, TDto>
            where TDto : class, IDto
            where TEntityData : class
        {
            var entities = context.Set<TEntity>();

            var entity = entities.Find(entityId);
            if (entity != null)
            {
                entity = EditByReflection(entity, data);

                entities.Update(entity);
                context.SaveChanges();

                var dto = CreateDto<TDtoBuilder, TDto>(entity);

                return dto;
            }

            return null;
        }

        private TEntity EditByReflection<TEntityData>(TEntity entity, TEntityData data)
            where TEntityData : class
        {
            var dataType = data.GetType();
            var entityType = entity.GetType();

            foreach (var dataProperty in dataType.GetProperties())
            {
                var entityProperty = entityType.GetProperty(dataProperty.Name);
                if(entityProperty != null)
                {
                    entityProperty.SetValue(entity, dataProperty.GetValue(data));
                }
            }

            return entity;
        }

        public void Delete(int entityId, ServiceDeskDbContext context, out bool isSuccess)
        {
            var entities = context.Set<TEntity>();

            var entity = entities.Find(entityId);

            if (entity != null)
            {
                entities.Remove(entity);
                context.SaveChanges();

                isSuccess = true;
            }
            else
            {
                isSuccess = false;
            }
        }
    }
}
