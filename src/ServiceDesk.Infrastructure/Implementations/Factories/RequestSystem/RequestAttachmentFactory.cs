using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.RequestSystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem
{
    public class RequestAttachmentData : IFactoryData
    {
        public string FilePath { get; set; }
        public int RequestId { get; set; }
    }

    public class RequestAttachmentFactory : IRequestAttachmentFactory<RequestAttachmentData>
    {
        public RequestAttachment Create(RequestAttachmentData data)
        {
            var requestAttachment = new RequestAttachment()
            {
                FilePath = data.FilePath,
                RequestId = data.RequestId
            };

            return requestAttachment;
        }
    }
}
