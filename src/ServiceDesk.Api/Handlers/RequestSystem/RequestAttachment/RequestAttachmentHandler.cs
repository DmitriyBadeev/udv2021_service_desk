using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Types;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.RequestAttachment;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos.RequestAttachment;
using ServiceDesk.Api.Services.FilesManager;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;

namespace ServiceDesk.Api.Handlers.RequestSystem.RequestAttachment
{
    public class RequestAttachmentHandler : GenericHandler<Core.Entities.RequestSystem.RequestAttachment>, IRequestAttachmentHandler
    {
        private readonly IDtoBuilderManager<Core.Entities.RequestSystem.RequestAttachment> dtoBuilderManager;
        private readonly IFilesManager filesManager;

        public RequestAttachmentHandler(IDtoBuilderManager<Core.Entities.RequestSystem.RequestAttachment> dtoBuilderManager,
            IFilesManager filesManager)
        {
            this.dtoBuilderManager = dtoBuilderManager;
            this.filesManager = filesManager;
        }

        public RequestAttachmentDto Create(Guid requestId, IFile file, ServiceDeskDbContext context)
        {
            var savedFile = filesManager
                .CreateFile(requestId, file).Result;

            var data = new RequestAttachmentData()
            {
                FilePath = savedFile.Path,
                RealName = savedFile.RealName,
                UnicalName = savedFile.UnicalName,
                RequestId = requestId,
                SizeMb = savedFile.SizeMb,
                Reference = savedFile.Reference
            };

            return base.Create<RequestAttachmentFactory, 
                RequestAttachmentDtoBuilder, 
                RequestAttachmentData, 
                RequestAttachmentDto>(data, context);
        }

        public string Delete(int requestAttachmentId, ServiceDeskDbContext context)
        {
            var requestAttachment = context.RequestAttachments.Find(requestAttachmentId);

            filesManager.RemoveFile(requestAttachment.RequestId, requestAttachment.UnicalName);

            bool isSuccess;
            base.Delete(requestAttachmentId, context, out isSuccess);

            return isSuccess ? "Ok" : "Error";
        }
    }
}
