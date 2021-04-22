using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Request;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos.Request;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Handlers.RequestSystem.Request
{
    public class RequestHandler : GenericHandler<Core.Entities.RequestSystem.Request>, IRequestHandler
    {
        private readonly IDtoBuilderManager<Core.Entities.RequestSystem.Request> dtoBuilderManager;

        public RequestHandler(IDtoBuilderManager<Core.Entities.RequestSystem.Request> dtoBuilderManager)
        {
            this.dtoBuilderManager = dtoBuilderManager;
        }

        public List<RequestBoardDto> RequestBoards(ServiceDeskDbContext context)
        {
            var dtoBuilder = dtoBuilderManager.GetDtoBuilder<RequestDtoBuilder, RequestDto>();

            var boards = dtoBuilder.BuildRequestBoards(context);

            return boards;
        }

        public List<RequestDto> Query(Expression<Func<Core.Entities.RequestSystem.Request, bool>> sample, 
            ServiceDeskDbContext context)
        {
            var dtoBuilder = dtoBuilderManager.GetDtoBuilder<RequestDtoBuilder, RequestDto>();

            var requests = context.Requests
                .Where(sample)
                .Include(x => x.SoftwareModule)
                .ThenInclude(x => x.Software)
                .Select(dtoBuilder.Build)
                .ToList();

            return requests;
        }
    }
}
