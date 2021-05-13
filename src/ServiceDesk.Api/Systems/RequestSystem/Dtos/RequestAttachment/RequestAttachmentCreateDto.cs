using System;
using HotChocolate.Types;

namespace ServiceDesk.Api.Systems.RequestSystem.Dtos.RequestAttachment
{
    public class RequestAttachmentCreateDto
    {
        public Guid RequestId { get; set; }
        public IFile File { get; set; }
    }
}
