using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.RequestAttachment;
using ServiceDesk.Api.Dtos.RequestAttachment;
using ServiceDesk.Api.Handlers.RequestSystem.RequestAttachment;
using ServiceDesk.Api.Services.FilesManager;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;

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
