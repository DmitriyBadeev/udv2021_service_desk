using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using ServiceDesk.Api.Builders.DtoBuilders.Client;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Core.Interfaces.Factories.PersonalAreaSystem;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;

namespace ServiceDesk.Api.Handlers.PersonalAreaSystem.Client
{
    public class ClientHandler : IClientHandler
    {
        private readonly IClientFactory<ClientData> clientFactory;
        private readonly IClientDtoBuilder clientDtoBuilder;

        public ClientHandler(IClientFactory<ClientData> clientFactory,
            IClientDtoBuilder clientDtoBuilder)
        {
            this.clientFactory = clientFactory;
            this.clientDtoBuilder = clientDtoBuilder;
        }

        public ClientDto Create(ClientCreateDto clientCreateDto,
            [Service] ServiceDeskDbContext context)
        {
            var clientData = new ClientData()
            {
                Name = clientCreateDto.Name
            };

            var client = clientFactory.Create(clientData);

            context.Clients.Add(client);
            context.SaveChanges();

            var clientDto = clientDtoBuilder.Build(client);

            return clientDto;
        }

        public ClientDto Get(int clientId,
            [Service] ServiceDeskDbContext context)
        {
            var client = context.Clients.Find(clientId);

            var clientDto = clientDtoBuilder.Build(client);

            return clientDto;
        }

        public IEnumerable<ClientListDto> GetAll([Service] ServiceDeskDbContext context)
        {
            var clients = context.Clients.AsEnumerable();

            var clientListDtos = clients.Select(clientDtoBuilder.BuildListItem);

            return clientListDtos;
        }

        public IEnumerable<ClientListDto> Page(int pageNumber, int count,
            [Service] ServiceDeskDbContext context)
        {
            var clients = context.Clients
                .Skip(pageNumber * count)
                .Take(count)
                .AsEnumerable();

            var clientListDtos = clients.Select(clientDtoBuilder.BuildListItem);

            return clientListDtos;
        }

        public ClientDto Edit(int id, ClientCreateDto clientCreateDto,
            [Service] ServiceDeskDbContext context)
        {
            var client = context.Clients.Find(id);
            client.Name = clientCreateDto.Name;

            context.Update(client);
            context.SaveChanges();

            var clientDto = clientDtoBuilder.Build(client);

            return clientDto;
        }

        public void Delete(int id,
            [Service] ServiceDeskDbContext context)
        {
            var client = context.Clients.Find(id);

            context.Clients.Remove(client);
            context.SaveChanges();
        }
    }
}
