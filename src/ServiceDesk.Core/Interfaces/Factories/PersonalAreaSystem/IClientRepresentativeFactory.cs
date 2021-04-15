using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories.PersonalAreaSystem
{
    public interface IClientRepresentativeFactory<in TData> : IGenericFactory<ClientRepresentative, TData>
        where TData : IFactoryData
    {

    }
}
