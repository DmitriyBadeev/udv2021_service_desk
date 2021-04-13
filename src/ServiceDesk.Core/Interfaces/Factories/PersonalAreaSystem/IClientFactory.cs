using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories.PersonalAreaSystem
{
    public interface IClientFactory<in TData> : IGenericFactory<Client, TData>
        where TData : IFactoryData
    {

    }
}
