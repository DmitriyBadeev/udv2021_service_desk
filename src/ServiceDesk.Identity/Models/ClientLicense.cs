using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ServiceDesk.Identity.Models
{
    public class ClientLicense
    {
        public int Id { get; set; }

        public int ClientId { get; set; }
        
        public int LicenseId { get; set; }

        public int CountOfUsers { get; set; }
    }
}
