using System;
using ServiceDesk.Api.Systems.Common.Interfaces.Dto;

namespace ServiceDesk.Api.Systems.PersonalAreaSystem.Dtos.Client
{
    public class ClientDto : IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? LockDate { get; set; }
        
        public int[] LicenseIds { get; set; }
    }
}
