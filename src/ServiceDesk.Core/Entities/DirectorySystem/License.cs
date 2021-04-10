using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Entities.PersonalAreaSystem;

namespace ServiceDesk.Core.Entities.DirectorySystem
{
    public class License
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public int CountOfUsers { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public int SoftwareId { get; set; }
        public Software Software { get; set; }
    }
}
