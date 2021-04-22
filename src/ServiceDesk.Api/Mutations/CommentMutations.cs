using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Client;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Comment;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Api.Dtos.Comment;
using ServiceDesk.Api.Handlers.RequestSystem.Comment;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;

namespace ServiceDesk.Api.Mutations
{
    [ExtendObjectType(Name = "Mutations")]
    public class CommentMutations
    {
        private readonly ICommentHandler commentHandler;

        public CommentMutations(ICommentHandler commentHandler)
        {
            this.commentHandler = commentHandler;
        }
        
        public CommentDto CreateComment(CommentCreateDto commentCreateDto, [Service] ServiceDeskDbContext context)
        {
            var commentData = new CommentData()
            {
                Text = commentCreateDto.Text,
                AuthorId = commentCreateDto.AuthorId,
                RequestId = commentCreateDto.RequestId
            };

            var comment = commentHandler.Create<CommentFactory,
                CommentDtoBuilder,
                CommentData,
                CommentDto>(commentData, context);

            return comment;
        }
        
        public CommentDto EditComment(int id, CommentCreateDto commentCreateDto, [Service] ServiceDeskDbContext context)
        {
            var comment = commentHandler.Edit<CommentDtoBuilder,
                CommentDto,
                CommentCreateDto>(id, commentCreateDto, context);

            return comment;
        }
        
        public string DeleteComment(int id, [Service] ServiceDeskDbContext context)
        {
            bool isSuccess;
            commentHandler.Delete(id, context, out isSuccess);

            if (isSuccess)
            {
                return "Ok";
            }

            return "Error";
        }
    }
}
