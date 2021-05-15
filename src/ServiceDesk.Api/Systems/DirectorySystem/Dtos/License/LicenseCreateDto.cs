using System;

namespace ServiceDesk.Api.Systems.DirectorySystem.Dtos.License
{
    public class LicenseCreateDto
    {
        public string Number { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public int CountOfUsers { get; set; }
        public int? ClientId { get; set; }
        public int SoftwareId { get; set; }
    }
}
