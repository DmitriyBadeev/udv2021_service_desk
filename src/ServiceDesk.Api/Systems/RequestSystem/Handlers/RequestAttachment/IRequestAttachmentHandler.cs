using System;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.Common.Interfaces.Handler;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.RequestAttachment;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Systems.RequestSystem.Handlers.RequestAttachment
{
    public interface IRequestAttachmentHandler : IGenericHandler<Core.Entities.RequestSystem.RequestAttachment>
    {
        public RequestAttachmentDto Create(Guid requestId, IFile file, ServiceDeskDbContext context);
        public string Delete(int requestAttachmentId, ServiceDeskDbContext context);
    }
}
