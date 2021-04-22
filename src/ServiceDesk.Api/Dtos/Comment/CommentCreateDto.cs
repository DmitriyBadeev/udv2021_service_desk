using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Api.Dtos.Comment
{
    public class CommentCreateDto
    {
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public Guid RequestId { get; set; }
    }
}
