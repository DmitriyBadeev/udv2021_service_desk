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

        public int RequestId { get; set; }
        public Request Request { get; set; }
    }
}
