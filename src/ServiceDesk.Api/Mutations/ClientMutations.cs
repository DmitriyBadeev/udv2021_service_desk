using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Api.Handlers.PersonalAreaSystem.Client;
using ServiceDesk.Infrastructure;

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
            var client = clientHandler.Create(clientCreateDto, context);

            return client;
        }
        
        [Authorize(Roles = new[] {Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE})]
        public ClientDto EditClient(int id, ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context)
        {

            var client = clientHandler.Edit(id, clientCreateDto, context);

            return client;
        }
        
        [Authorize(Roles = new[] {Constants.DEVELOPER_ROLE})]
        public string DeleteClient(int id, [Service] ServiceDeskDbContext context)
        {
            clientHandler.Delete(id, context);

            return "Ok";
        }
    }
}
