using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories
{
    public interface IGenericFactory<out TEntity, in TData>
        where TEntity : class, IEntity
        where TData : IFactoryData
    {
        TEntity Create(TData data);
    }
}
