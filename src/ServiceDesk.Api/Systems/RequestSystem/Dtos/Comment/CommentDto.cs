using System;
using ServiceDesk.Api.Systems.Common.Interfaces.Dto;

namespace ServiceDesk.Api.Systems.RequestSystem.Dtos.Comment
{
    public class CommentDto : IDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
