using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Samples;
using ServiceDesk.Api.Samples.Models;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Request;
using ServiceDesk.Api.Systems.RequestSystem.Handlers.Request;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Infrastructure;
using RequestDtoBuilder = ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Request.RequestDtoBuilder;

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
        public IEnumerable<RequestBoardDto> GetRequestBoards(RequestFilterDto requestFilterDto, 
            [Service] ServiceDeskDbContext context)
        {
            var filterRequests =
                RequestSamples.BySoftware(requestFilterDto.SoftwareId)
                    .And(RequestSamples.ByAuthor(requestFilterDto.AuthorId))
                    .And(RequestSamples.ByDeveloperRepresentative(requestFilterDto.DeveloperRepresentativeId))
                    .GetExpression();

            var boards = requestHandler.RequestBoards(filterRequests, context);

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
