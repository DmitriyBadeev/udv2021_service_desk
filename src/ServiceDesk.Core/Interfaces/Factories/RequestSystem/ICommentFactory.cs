using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories.RequestSystem
{
    public interface ICommentFactory<in TData> : IGenericFactory<Comment, TData>
        where TData : IFactoryData
    {

    }
}
