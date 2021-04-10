using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceDesk.Core.Entities.DirectorySystem
{
    public class Software
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public ICollection<SoftwareModule> SoftwareModules { get; set; }
    }
}
