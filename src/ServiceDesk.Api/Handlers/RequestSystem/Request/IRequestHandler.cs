using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using HotChocolate;
using ServiceDesk.Api.Dtos.Request;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Handlers.RequestSystem.Request
{
    public interface IRequestHandler : IGenericHandler<Core.Entities.RequestSystem.Request>
    {
        public List<RequestBoardDto> RequestBoards([Service] ServiceDeskDbContext context);

        public List<RequestDto> Query(Expression<Func<Core.Entities.RequestSystem.Request, bool>> sample,
            ServiceDeskDbContext context);
    }
}
