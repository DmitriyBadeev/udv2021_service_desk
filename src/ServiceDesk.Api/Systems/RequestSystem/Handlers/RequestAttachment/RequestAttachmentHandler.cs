using System;
using HotChocolate.Types;
using ServiceDesk.Api.Services.FilesManager;
using ServiceDesk.Api.Systems.Common.Implemetations.Handler;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.RequestAttachment;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;
using RequestAttachmentDtoBuilder = ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.RequestAttachment.RequestAttachmentDtoBuilder;

namespace ServiceDesk.Api.Systems.RequestSystem.Handlers.RequestAttachment
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

        public string Create(Guid requestId, IFile file, ServiceDeskDbContext context)
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

            base.Create<RequestAttachmentFactory, RequestAttachmentData>(data, context);

            return "Ok";
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
