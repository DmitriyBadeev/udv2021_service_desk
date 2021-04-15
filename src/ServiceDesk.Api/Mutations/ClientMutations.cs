using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.Extensions.DependencyInjection;
using ServiceDesk.Api.Builders.DtoBuilders.Client;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Api.Handlers.PersonalAreaSystem.Client;
using ServiceDesk.Core.Interfaces.Factories.PersonalAreaSystem;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;

namespace ServiceDesk.Api.Mutations
{
    [ExtendObjectType(Name = "Mutations")]
    public class ClientMutations
    {
        private readonly IClientHandler clientHandler;

        public ClientMutations(IClientHandler clientHandler)
        {
            this.clientHandler = clientHandler;
        }

        public ClientDto CreateClient(ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context)
        {
            var client = clientHandler.Create(clientCreateDto, context);

            return client;
        }

        public ClientDto EditClient(int id, ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context)
        {

            var client = clientHandler.Edit(id, clientCreateDto, context);

            return client;
        }

        public string DeleteClient(int id, [Service] ServiceDeskDbContext context)
        {
            clientHandler.Delete(id, context);

            return "Ok";
        }
    }
}
