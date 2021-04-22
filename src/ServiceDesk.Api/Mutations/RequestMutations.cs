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
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;

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

        //[Authorize(Roles = new[] {Constants.DEVELOPER_ROLE})]
        public RequestDto CreateRequest(RequestCreateDto requestCreateDto, [Service] ServiceDeskDbContext context)
        {
            var requestData = new RequestData()
            {
                Theme = requestCreateDto.Theme,
                AuthorId = requestCreateDto.AuthorId,
                SoftwareModuleId = requestCreateDto.SoftwareModuleId,
                Text = requestCreateDto.Text
            };

            var client = requestHandler.Create<RequestFactory,
                RequestDtoBuilder,
                RequestData,
                RequestDto>(requestData, context);

            return client;
        }

        //[Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE })]
        public RequestDto EditRequest(Guid id, RequestCreateDto requestCreateDto, [Service] ServiceDeskDbContext context)
        {
            var requestDto = requestHandler.Edit<RequestDtoBuilder,
                RequestDto,
                RequestCreateDto>(id, requestCreateDto, context);

            return requestDto;
        }

        //[Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
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
    }
}
