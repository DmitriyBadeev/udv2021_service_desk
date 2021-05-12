using ServiceDesk.Api.Systems.RequestSystem.Dtos.Comment;

namespace ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Comment
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
