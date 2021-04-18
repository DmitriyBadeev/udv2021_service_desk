using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories
{
    public interface IFactoryManager<in TEntity, out TData>
        where TEntity : class, IEntity
        where TData : IFactoryData
    {
        public TFactory GetFactory<TFactory>()
            where TFactory : class, IGenericFactory<TEntity, TData>;
    }
}
