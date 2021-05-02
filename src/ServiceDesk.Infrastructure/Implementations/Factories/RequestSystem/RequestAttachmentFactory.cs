using System;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.RequestSystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem
{
    public class RequestAttachmentData : IFactoryData
    {
        public string RealName { get; set; }
        public string UnicalName { get; set; }
        public string SizeMb { get; set; }
        public string FilePath { get; set; }
        public Guid RequestId { get; set; }
        public string Reference { get; set; }
    }

    public class RequestAttachmentFactory : IRequestAttachmentFactory<RequestAttachmentData>
    {
        public RequestAttachment Create(RequestAttachmentData data)
        {
            var requestAttachment = new RequestAttachment()
            {
                RealName = data.RealName,
                UnicalName = data.UnicalName,
                SizeMb = data.SizeMb,
                FilePath = data.FilePath,
                RequestId = data.RequestId,
                Reference = data.Reference
            };

            return requestAttachment;
        }
    }
}
