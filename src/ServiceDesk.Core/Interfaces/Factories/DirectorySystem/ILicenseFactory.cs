using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories.DirectorySystem
{
    public interface ILicenseFactory<in TData> : IGenericFactory<License, TData>
        where TData : IFactoryData
    {

    }
}
