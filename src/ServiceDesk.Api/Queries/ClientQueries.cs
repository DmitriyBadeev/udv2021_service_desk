using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
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

        public ClientDto GetClient(int clientId, [Service] ServiceDeskDbContext context)
        {

            var client = clientHandler.Get(clientId, context);

            return client;
        }

        public IEnumerable<ClientListDto> GetClients([Service] ServiceDeskDbContext context)
        {

            var clients = clientHandler.GetAll(context);

            return clients;
        }

        public IEnumerable<ClientListDto> PageClients(int pageNumber, int count, [Service] ServiceDeskDbContext context)
        {

            var clients = clientHandler.Page(pageNumber, count, context);

            return clients;
        }
    }
}
