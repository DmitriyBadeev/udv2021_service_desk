using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Client;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Request;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Api.Dtos.Request;
using ServiceDesk.Api.Handlers.RequestSystem.Request;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType(Name = "Queries")]
    public class RequestQueries
    {
        private readonly IRequestHandler requestHandler;

        public RequestQueries(IRequestHandler requestHandler)
        {
            this.requestHandler = requestHandler;
        }
        
        public RequestDto GetRequest(Guid requestId, [Service] ServiceDeskDbContext context)
        {
            var request = requestHandler.Get<RequestDtoBuilder, RequestDto>(requestId, context);

            return request;
        }
        
        public IEnumerable<RequestDto> GetRequests([Service] ServiceDeskDbContext context)
        {
            var requests = requestHandler.GetAll<RequestDtoBuilder, RequestDto>(context);

            return requests;
        }
        
        public IEnumerable<RequestDto> PageRequests(int pageNumber, int count, [Service] ServiceDeskDbContext context)
        {
            var requests = requestHandler.Page<RequestDtoBuilder, RequestDto>(pageNumber, count, context);

            return requests;
        }

        public IEnumerable<RequestBoardDto> GetRequestBoards([Service] ServiceDeskDbContext context)
        {
            var boards = requestHandler.RequestBoards(context);

            return boards;
        }

        public IEnumerable<RequestDto> GetClientRequests(int clientId, [Service] ServiceDeskDbContext context)
        {
            var requests = requestHandler.Query(x => x.Author.ClientId == clientId, context);

            return requests;
        }
    }
}
