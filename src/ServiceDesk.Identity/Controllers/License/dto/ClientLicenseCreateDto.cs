using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Identity.Controllers.License.dto
{
    public class ClientLicenseCreateDto
    {
        public int ClientId { get; set; }
        public int LicenseId { get; set; }
        public int CountOfUsers { get; set; }
    }
}
