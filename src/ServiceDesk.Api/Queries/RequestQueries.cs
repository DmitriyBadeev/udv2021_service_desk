using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Request;
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
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public RequestDto GetRequest(Guid requestId, [Service] ServiceDeskDbContext context)
        {
            var request = requestHandler.Get<RequestDtoBuilder, RequestDto>(requestId, context);

            return request;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<RequestDto> GetRequests([Service] ServiceDeskDbContext context)
        {
            var requests = requestHandler.GetAll<RequestDtoBuilder, RequestDto>(context);

            return requests;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<RequestDto> PageRequests(int pageNumber, int count, [Service] ServiceDeskDbContext context)
        {
            var requests = requestHandler.Page<RequestDtoBuilder, RequestDto>(pageNumber, count, context);

            return requests;
        }
        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public IEnumerable<RequestBoardDto> GetRequestBoards([Service] ServiceDeskDbContext context)
        {
            var boards = requestHandler.RequestBoards(context);

            return boards;
        }
    
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<RequestDto> GetClientRequests(int clientId, [Service] ServiceDeskDbContext context)
        {
            var requests = requestHandler
                .Query<RequestDtoBuilder, RequestDto>(x => x.ClientId == clientId, context);

            return requests;
        }
    }
}
