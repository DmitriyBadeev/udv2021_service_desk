using HotChocolate;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.RequestAttachment;
using ServiceDesk.Api.Systems.RequestSystem.Handlers.RequestAttachment;
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

        public string CreateRequestAttachment(RequestAttachmentCreateDto requestAttachmentCreateDto, 
            [Service] ServiceDeskDbContext context)
        {
            var response = requestAttachmentHandler.Create(requestAttachmentCreateDto.RequestId, 
                requestAttachmentCreateDto.File, 
                context);

            return response;
        }

        public string DeleteRequestAttachment(int requestAttachmentId,
            [Service] ServiceDeskDbContext context)
        {
            return requestAttachmentHandler.Delete(requestAttachmentId, context);
        }
    }
}
