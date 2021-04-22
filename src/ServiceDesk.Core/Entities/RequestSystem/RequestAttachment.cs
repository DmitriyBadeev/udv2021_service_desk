using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.RequestSystem
{
    public class RequestAttachment : IEntity
    {
        public int Id { get; set; }
        public string FilePath { get; set; }

        public Guid RequestId { get; set; }
        public virtual Request Request { get; set; }
    }
}
