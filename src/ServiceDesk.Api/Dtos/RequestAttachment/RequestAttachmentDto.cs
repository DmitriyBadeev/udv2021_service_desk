using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Api.Dtos.RequestAttachment
{
    public class RequestAttachmentDto : IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SizeMb { get; set; }
        public string Reference { get; set; }
    }
}
