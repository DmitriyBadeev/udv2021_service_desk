using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories;

namespace ServiceDesk.Infrastructure.Implementations.Factories
{
    public class FactoryManager<TEntity, TData> : IFactoryManager<TEntity, TData>
        where TEntity : class, IEntity
        where TData : IFactoryData
    {
        public TFactory GetFactory<TFactory>()
            where TFactory : class, IGenericFactory<TEntity, TData>
        {
            var factoryType = typeof(TFactory);

            var entityFactory = (TFactory)Activator.CreateInstance(factoryType);

            return entityFactory;
        }
    }
}
