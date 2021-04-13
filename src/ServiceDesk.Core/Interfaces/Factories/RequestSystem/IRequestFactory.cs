using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Enums;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories.RequestSystem
{
    public interface IRequestFactory<in TData> : IGenericFactory<Request, TData>
        where TData : IFactoryData
    {

    }
}
