using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Enums;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.RequestSystem
{
    public class Request : IEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string Theme { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? ProcessingDate { get; set; }
        public string DeveloperRepresentativeId { get; set; }
        public RequestStatuses RequestStatus { get; set; }
        public virtual ICollection<RequestAttachment> RequestAttachments { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }

        public string AuthorId { get; set; }
        public virtual ClientRepresentative Author { get; set; }

        public int SoftwareModuleId { get; set; }
        public virtual SoftwareModule SoftwareModule { get; set; }
    }
}
