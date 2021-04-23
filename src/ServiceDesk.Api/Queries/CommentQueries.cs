using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Client;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Comment;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Api.Dtos.Comment;
using ServiceDesk.Api.Handlers.RequestSystem.Comment;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType("Queries")]
    public class CommentQueries
    {
        private readonly ICommentHandler commentHandler;

        public CommentQueries(ICommentHandler commentHandler)
        {
            this.commentHandler = commentHandler;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public CommentDto GetComment(int id, [Service] ServiceDeskDbContext context)
        {

            var comment = commentHandler.Get<CommentDtoBuilder, CommentDto>(id, context);

            return comment;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<CommentDto> GetComments([Service] ServiceDeskDbContext context)
        {

            var comments = commentHandler.GetAll<CommentDtoBuilder, CommentDto>(context);

            return comments;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<CommentDto> PageComments(int pageNumber, int count, [Service] ServiceDeskDbContext context)
        {

            var comments = commentHandler.Page<CommentDtoBuilder, CommentDto>(pageNumber, count, context);

            return comments;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<CommentDto> GetRequestComments(Guid requestId, [Service] ServiceDeskDbContext context)
        {
            var comments = commentHandler
                .Query<CommentDtoBuilder, CommentDto>(x => x.RequestId == requestId, context);

            return comments;
        }
    }
}
