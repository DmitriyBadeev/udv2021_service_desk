using System;
using ServiceDesk.Api.Systems.Common.Interfaces.Dto;

namespace ServiceDesk.Api.Systems.DirectorySystem.Dtos.License
{
    public class LicenseDto : IDto
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public int CountOfUsers { get; set; }
        public int? ClientId { get; set; }
        public string Client { get; set; }
        public int SoftwareId { get; set; }
        public string Software { get; set; }
    }
}
