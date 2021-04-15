using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.RequestSystem
{
    public class Comment : IEntity
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
