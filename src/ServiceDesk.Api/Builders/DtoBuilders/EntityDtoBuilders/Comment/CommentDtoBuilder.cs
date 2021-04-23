using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Dtos.Comment;

namespace ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Comment
{
    public class CommentDtoBuilder : ICommentDtoBuilder<CommentDto>
    {
        public CommentDto Build(Core.Entities.RequestSystem.Comment entity)
        {
            var commentDto = new CommentDto()
            {
                Id = entity.Id,
                Text = entity.Text,
                AuthorId = entity.AuthorId,
                CreationDate = entity.CreationDate
            };

            return commentDto;
        }
    }
}
