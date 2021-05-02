using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.RequestAttachment;
using ServiceDesk.Api.Dtos.RequestAttachment;
using ServiceDesk.Api.Handlers.RequestSystem.RequestAttachment;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType("Queries")]
    public class RequestAttachmentQueries
    {
        private readonly IRequestAttachmentHandler requestAttachmentHandler;

        public RequestAttachmentQueries(IRequestAttachmentHandler requestAttachmentHandler)
        {
            this.requestAttachmentHandler = requestAttachmentHandler;
        }

        public RequestAttachmentDto GetAttachment(int id, [Service] ServiceDeskDbContext context)
        {
            var attachment = requestAttachmentHandler.Get<RequestAttachmentDtoBuilder, 
                RequestAttachmentDto>(id, context);

            return attachment;
        }

        public IEnumerable<RequestAttachmentDto> GetAttachments([Service] ServiceDeskDbContext context)
        {
            var attachments = requestAttachmentHandler.GetAll<RequestAttachmentDtoBuilder,
                RequestAttachmentDto>(context);

            return attachments;
        }

        public IEnumerable<RequestAttachmentDto> GetRequestAttachments(Guid requestId, [Service] ServiceDeskDbContext context)
        {
            var attachments = requestAttachmentHandler.Query<RequestAttachmentDtoBuilder,
                RequestAttachmentDto>(x => x.RequestId == requestId, context);

            return attachments;
        }
    }
}
