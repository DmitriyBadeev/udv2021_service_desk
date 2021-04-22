using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Enums;

namespace ServiceDesk.Api.Dtos.Request
{
    public class RequestCreateDto
    {
        public string Theme { get; set; }
        public string Text { get; set; }
        public string DeveloperRepresentativeId { get; set; }
        public string AuthorId { get; set; }
        public int SoftwareModuleId { get; set; }
    }
}
