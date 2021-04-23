using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Api.Dtos.Request
{
    public class RequestDto : IDto
    {
        public Guid Id { get; set; }
        public string Theme { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? ProcessingDate { get; set; }
        public string DeveloperRepresentativeId { get; set; }
        public string AuthorId { get; set; }
        public string Software { get; set; }
        public string SoftwareModule { get; set; }
        public string RequestStatus { get; set; }

        public int ClientId { get; set; }
    }
}
