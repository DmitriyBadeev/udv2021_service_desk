using System.Collections.Generic;

namespace ServiceDesk.Api.Systems.PersonalAreaSystem.Dtos.Client
{
    public class ClientCreateDto
    {
        public string Name { get; set; }
        public List<int> LicenseIds { get; set; }
    }
}
