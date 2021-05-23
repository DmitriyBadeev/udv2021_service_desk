using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Api.Systems.RequestSystem.Dtos.Request
{
    public class RequestFilterDto
    {
        public int? SoftwareId { get; set; }
        public string AuthorId { get; set; }
        public string DeveloperRepresentativeId { get; set; }
    }
}
