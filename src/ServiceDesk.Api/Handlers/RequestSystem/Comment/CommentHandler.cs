using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Handlers.RequestSystem.Comment
{
    public class CommentHandler : GenericHandler<Core.Entities.RequestSystem.Comment>, ICommentHandler
    {
        private readonly IDtoBuilderManager<Core.Entities.RequestSystem.Comment> dtoBuilderManager;

        public CommentHandler(IDtoBuilderManager<Core.Entities.RequestSystem.Comment> dtoBuilderManager)
        {
            this.dtoBuilderManager = dtoBuilderManager;
        }
    }
}
