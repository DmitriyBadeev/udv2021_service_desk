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
        public string CreateClient(ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context)
        {
            var clientData = new ClientData()
            {
                Name = clientCreateDto.Name
            };

            clientHandler.CreateWithLicenses(clientData, clientCreateDto.LicenseIds, context);

            return "Ok";
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE })]
        public string EditClient(int id, ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context)
        {
            clientHandler.EditWithLicenses(id, clientCreateDto, context);

            return "Ok";
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

        [Authorize(Roles = new[] {Constants.DEVELOPER_ROLE})]
        public string BlockClient(int id, [Service] ServiceDeskDbContext context)
        {
            clientHandler.Block(id, context);

            return "Ok";
        }
    }
}
