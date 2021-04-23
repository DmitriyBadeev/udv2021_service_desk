using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using HotChocolate;
using ServiceDesk.Api.Dtos.Request;
using ServiceDesk.Core.Enums;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Handlers.RequestSystem.Request
{
    public interface IRequestHandler : IGenericHandler<Core.Entities.RequestSystem.Request>
    {
        public List<RequestBoardDto> RequestBoards([Service] ServiceDeskDbContext context);

        public void ChangeStatus(Guid requestId,
            RequestStatuses toStatus,
            ServiceDeskDbContext context);
    }
}
