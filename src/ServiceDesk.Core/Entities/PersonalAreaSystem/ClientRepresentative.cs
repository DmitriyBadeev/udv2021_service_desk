using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.PersonalAreaSystem
{
    public class ClientRepresentative : IEntity
    {
        [Key]
        public string UserId { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}
