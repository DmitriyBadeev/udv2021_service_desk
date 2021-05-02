using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Types;
using ServiceDesk.Api.Dtos.RequestAttachment;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Handlers.RequestSystem.RequestAttachment
{
    public interface IRequestAttachmentHandler : IGenericHandler<Core.Entities.RequestSystem.RequestAttachment>
    {
        public RequestAttachmentDto Create(Guid requestId, IFile file, ServiceDeskDbContext context);
        public string Delete(int requestAttachmentId, ServiceDeskDbContext context);
    }
}
