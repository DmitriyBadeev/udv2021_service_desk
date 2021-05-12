using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Api.Systems.Common.Implemetations.Handler;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Request;
using ServiceDesk.Core.Enums;
using ServiceDesk.Infrastructure;
using RequestDtoBuilder = ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Request.RequestDtoBuilder;

namespace ServiceDesk.Api.Systems.RequestSystem.Handlers.Request
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

        public override IEnumerable<TDto> Query<TDtoBuilder, TDto>(Expression<Func<Core.Entities.RequestSystem.Request, bool>> sample, 
            ServiceDeskDbContext context)
        {
            var dtoBuilder = dtoBuilderManager.GetDtoBuilder<TDtoBuilder, TDto>();

            var requests = context.Requests
                .Where(sample)
                .Include(x => x.SoftwareModule)
                .ThenInclude(x => x.Software)
                .Select(dtoBuilder.Build)
                .ToList();

            return requests;
        }

        public void ChangeStatus(Guid requestId, 
            RequestStatuses toStatus, 
            ServiceDeskDbContext context)
        {
            var request = context.Requests.Find(requestId);

            request.ChangeStatus(toStatus);

            context.Update(request);
            context.SaveChanges();
        }
    }
}
