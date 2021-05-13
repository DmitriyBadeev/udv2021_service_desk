using System;

namespace ServiceDesk.Api.Systems.RequestSystem.Dtos.Comment
{
    public class CommentCreateDto
    {
        public string Text { get; set; }
        public Guid RequestId { get; set; }
    }
}
