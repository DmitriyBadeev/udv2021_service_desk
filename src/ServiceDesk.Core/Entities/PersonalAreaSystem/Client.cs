using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.PersonalAreaSystem
{
    public class Client : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? LockDate { get; set; }
        public virtual ICollection<License> Licenses { get; set; }
        public virtual ICollection<ClientRepresentative> ClientRepresentatives { get; set; }
    }
}
