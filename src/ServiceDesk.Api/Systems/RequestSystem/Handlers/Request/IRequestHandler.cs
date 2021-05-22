using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using HotChocolate;
using ServiceDesk.Api.Systems.Common.Interfaces.Handler;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Request;
using ServiceDesk.Core.Enums;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Systems.RequestSystem.Handlers.Request
{
    public interface IRequestHandler : IGenericHandler<Core.Entities.RequestSystem.Request>
    {
        public List<RequestBoardDto> RequestBoards(Expression<Func<Core.Entities.RequestSystem.Request, bool>> sample, 
            [Service] ServiceDeskDbContext context);

        public void ChangeStatus(Guid requestId,
            RequestStatuses toStatus,
            ServiceDeskDbContext context);
    }
}
