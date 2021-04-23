using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Client;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Api.Handlers;
using ServiceDesk.Api.Handlers.PersonalAreaSystem.Client;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
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
        
        [Authorize(Roles = new[] {Constants.DEVELOPER_ROLE})]
        public ClientDto CreateClient(ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context)
        {
            var clientData = new ClientData()
            {
                Name = clientCreateDto.Name
            };

            var client = clientHandler.Create<ClientFactory, 
                ClientDtoBuilder,
                ClientData, 
                ClientDto>(clientData, context);

            return client;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE })]
        public ClientDto EditClient(int id, ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context)
        {
            var client = clientHandler.Edit<ClientDtoBuilder, 
                ClientDto, 
                ClientCreateDto>(id, clientCreateDto, context);

            return client;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string DeleteClient(int id, [Service] ServiceDeskDbContext context)
        {
            bool isSuccess;
            clientHandler.Delete(id, context, out isSuccess);

            if (isSuccess)
            {
                return "Ok";
            }

            return "Error";
        }
    }
}
