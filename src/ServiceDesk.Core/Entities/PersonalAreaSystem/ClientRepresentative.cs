using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ServiceDesk.Core.Entities.PersonalAreaSystem
{
    public class ClientRepresentative
    {
        [Key]
        public string UserId { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}
