using System;
using ServiceDesk.Api.Systems.Common.Interfaces.Dto;

namespace ServiceDesk.Api.Systems.RequestSystem.Dtos.Request
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
        public int? SoftwareId { get; set; }
        public string Software { get; set; }
        public string SoftwareModule { get; set; }
        public int? SoftwareModuleId { get; set; }
        public string RequestStatus { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
    }
}
