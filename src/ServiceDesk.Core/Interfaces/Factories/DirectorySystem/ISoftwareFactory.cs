using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories.DirectorySystem
{
    public interface ISoftwareFactory<in TData> : IGenericFactory<Software, TData>
        where TData : IFactoryData
    {

    }
}
