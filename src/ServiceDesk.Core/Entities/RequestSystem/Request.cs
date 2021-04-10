using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Enums;

namespace ServiceDesk.Core.Entities.RequestSystem
{
    public class Request
    {
        public int Id { get; set; }
        public string Theme { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ProcessingDate { get; set; }
        public string DeveloperRepresentativeId { get; set; }
        public RequestStatuses RequestStatus { get; set; }
        public ICollection<RequestAttachment> RequestAttachments { get; set; }
        public ICollection<Comment> Comments { get; set; }

        public string AuthorId { get; set; }
        public ClientRepresentative Author { get; set; }

        public int SoftwareModuleId { get; set; }
        public SoftwareModule SoftwareModule { get; set; }
    }
}
