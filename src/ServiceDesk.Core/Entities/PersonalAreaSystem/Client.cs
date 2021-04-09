using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.DirectorySystem;

namespace ServiceDesk.Core.Entities.PersonalAreaSystem
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LockDate { get; set; }
        public ICollection<License> Licenses { get; set; }
        public ICollection<ClientRepresentative> ClientRepresentatives { get; set; }
    }
}
