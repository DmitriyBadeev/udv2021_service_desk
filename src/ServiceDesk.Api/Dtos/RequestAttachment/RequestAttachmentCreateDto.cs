using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;

namespace ServiceDesk.Api.Dtos.RequestAttachment
{
    public class RequestAttachmentCreateDto
    {
        public Guid RequestId { get; set; }
        public IFile File { get; set; }
    }
}
