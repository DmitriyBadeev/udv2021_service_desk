using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.DirectorySystem
{
    public class SoftwareModule : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public int SoftwareId { get; set; }
        public virtual Software Software { get; set; }

        [IgnoreDataMember]
        public virtual ICollection<Request> Requests { get; set; }
    }
}
