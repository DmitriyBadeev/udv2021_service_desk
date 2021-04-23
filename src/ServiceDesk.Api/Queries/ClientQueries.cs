using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.AspNetCore.Authorization;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Client;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Api.Handlers.PersonalAreaSystem.Client;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType(Name = "Queries")]
    public class ClientQueries
    {
        private readonly IClientHandler clientHandler;

        public ClientQueries(IClientHandler clientHandler)
        {
            this.clientHandler = clientHandler;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public ClientDto GetClient(int clientId, [Service] ServiceDeskDbContext context)
        {

            var client = clientHandler.Get<ClientDtoBuilder, ClientDto>(clientId, context);

            return client;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public IEnumerable<ClientDto> GetClients([Service] ServiceDeskDbContext context)
        {

            var clients = clientHandler.GetAll<ClientDtoBuilder, ClientDto>(context);

            return clients;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public IEnumerable<ClientDto> PageClients(int pageNumber, int count, [Service] ServiceDeskDbContext context)
        {

            var clients = clientHandler.Page<ClientDtoBuilder, ClientDto>(pageNumber, count, context);

            return clients;
        }
    }
}
