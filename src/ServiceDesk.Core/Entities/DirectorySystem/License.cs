using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.DirectorySystem
{
    public class License : IEntity
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public int CountOfUsers { get; set; }

        public int ClientId { get; set; }
        public virtual Client Client { get; set; }

        public int SoftwareId { get; set; }
        public virtual Software Software { get; set; }
    }
}
