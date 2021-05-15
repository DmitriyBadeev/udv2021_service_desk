using System;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Request;
using ServiceDesk.Api.Systems.RequestSystem.Handlers.Request;
using ServiceDesk.Core.Enums;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;
using RequestDtoBuilder = ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Request.RequestDtoBuilder;

namespace ServiceDesk.Api.Mutations
{
    [ExtendObjectType(Name = "Mutations")]
    public class RequestMutations
    {
        private readonly IRequestHandler requestHandler;

        public RequestMutations(IRequestHandler requestHandler)
        {
            this.requestHandler = requestHandler;
        }

        [Authorize(Roles = new[] {Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE, Constants.DEVELOPER_ROLE})]
        public string CreateRequest(RequestCreateDto requestCreateDto, 
            [Service] ServiceDeskDbContext context, [CurrentUserIdGlobalState] string userId)
        {
            var requestData = new RequestData()
            {
                Theme = requestCreateDto.Theme,
                AuthorId = userId,
                SoftwareModuleId = requestCreateDto.SoftwareModuleId,
                Text = requestCreateDto.Text,
                ClientId = requestCreateDto.ClientId
            };

            requestHandler.Create<RequestFactory, RequestData>(requestData, context);

            return "Ok";
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public RequestDto EditRequest(Guid id, RequestCreateDto requestCreateDto, [Service] ServiceDeskDbContext context)
        {
            var requestDto = requestHandler.Edit<RequestDtoBuilder,
                RequestDto,
                RequestCreateDto>(id, requestCreateDto, context);

            return requestDto;
        }

        
        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public string DeleteRequest(Guid id, [Service] ServiceDeskDbContext context)
        {
            bool isSuccess;
            requestHandler.Delete(id, context, out isSuccess);

            if (isSuccess)
            {
                return "Ok";
            }

            return "Error";
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string NewRequest(Guid id, [Service] ServiceDeskDbContext context)
        {
            requestHandler.ChangeStatus(id, RequestStatuses.New, context);

            return "Ok";
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string RegistrationRequest(Guid id, [Service] ServiceDeskDbContext context)
        {
            requestHandler.ChangeStatus(id, RequestStatuses.Registration, context);

            return "Ok";
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string InWorkRequest(Guid id, [Service] ServiceDeskDbContext context)
        {
            requestHandler.ChangeStatus(id, RequestStatuses.InWork, context);

            return "Ok";
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string ClosingRequest(Guid id, [Service] ServiceDeskDbContext context)
        {
            requestHandler.ChangeStatus(id, RequestStatuses.Closing, context);

            return "Ok";
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string RejectRequest(Guid id, [Service] ServiceDeskDbContext context)
        {
            requestHandler.ChangeStatus(id, RequestStatuses.Rejecting, context);

            return "Ok";
        }

        [Authorize(Roles = new[] { Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE, Constants.DEVELOPER_ROLE })]
        public string ReopenRequest(Guid id, [Service] ServiceDeskDbContext context)
        {
            requestHandler.ChangeStatus(id, RequestStatuses.Reopening, context);

            return "Ok";
        }
    }
}
