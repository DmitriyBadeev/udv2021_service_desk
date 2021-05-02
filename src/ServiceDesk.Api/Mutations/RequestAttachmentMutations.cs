using HotChocolate;
using HotChocolate.Types;
using ServiceDesk.Api.Dtos.RequestAttachment;
using ServiceDesk.Api.Handlers.RequestSystem.RequestAttachment;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Mutations
{
    [ExtendObjectType(Name = "Mutations")]
    public class RequestAttachmentMutations
    {
        private readonly IRequestAttachmentHandler requestAttachmentHandler;

        public RequestAttachmentMutations(IRequestAttachmentHandler requestAttachmentHandler)
        {
            this.requestAttachmentHandler = requestAttachmentHandler;
        }

        public RequestAttachmentDto CreateRequestAttachment(RequestAttachmentCreateDto requestAttachmentCreateDto, 
            [Service] ServiceDeskDbContext context)
        {
            var requestAttachmentDto = requestAttachmentHandler.Create(requestAttachmentCreateDto.RequestId, 
                requestAttachmentCreateDto.File, 
                context);

            return requestAttachmentDto;
        }

        public string DeleteRequestAttachment(int requestAttachmentId,
            [Service] ServiceDeskDbContext context)
        {
            return requestAttachmentHandler.Delete(requestAttachmentId, context);
        }
    }
}
