using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.PersonalAreaSystem.Dtos.Client;
using ServiceDesk.Api.Systems.PersonalAreaSystem.Handlers.Client;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;
using ClientDtoBuilder = ServiceDesk.Api.Systems.PersonalAreaSystem.DtoBuilders.Client.ClientDtoBuilder;

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
