using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.DirectorySystem
{
    public class Software : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<SoftwareModule> SoftwareModules { get; set; }
        public virtual ICollection<License> Licenses { get; set; }
    }
}
