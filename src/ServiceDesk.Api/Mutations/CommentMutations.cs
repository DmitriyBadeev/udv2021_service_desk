using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Comment;
using ServiceDesk.Api.Systems.RequestSystem.Handlers.Comment;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;
using CommentDtoBuilder = ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Comment.CommentDtoBuilder;

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
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public CommentDto CreateComment(CommentCreateDto commentCreateDto, 
            [Service] ServiceDeskDbContext context, [CurrentUserIdGlobalState] string userId)
        {
            var commentData = new CommentData()
            {
                Text = commentCreateDto.Text,
                AuthorId = userId,
                RequestId = commentCreateDto.RequestId
            };

            var comment = commentHandler.Create<CommentFactory,
                CommentDtoBuilder,
                CommentData,
                CommentDto>(commentData, context);

            return comment;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public CommentDto EditComment(int id, CommentCreateDto commentCreateDto, [Service] ServiceDeskDbContext context)
        {
            var comment = commentHandler.Edit<CommentDtoBuilder,
                CommentDto,
                CommentCreateDto>(id, commentCreateDto, context);

            return comment;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
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
