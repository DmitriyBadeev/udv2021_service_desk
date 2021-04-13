using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Interfaces.Factories.RequestSystem
{
    public interface IRequestAttachmentFactory<in TData> : IGenericFactory<RequestAttachment, TData>
        where TData : IFactoryData
    {

    }
}
