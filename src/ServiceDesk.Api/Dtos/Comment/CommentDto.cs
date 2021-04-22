﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Api.Dtos.Comment
{
    public class CommentDto : IDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
