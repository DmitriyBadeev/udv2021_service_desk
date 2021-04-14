using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;

namespace ServiceDesk.Api.Handlers.PersonalAreaSystem.Client
{
    public interface IClientHandler
    {
        public ClientDto Create(ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context);
        public ClientDto Get(int clientId, [Service] ServiceDeskDbContext context);
        public IEnumerable<ClientListDto> GetAll([Service] ServiceDeskDbContext context);
        public IEnumerable<ClientListDto> Page(int pageNumber, int count, [Service] ServiceDeskDbContext context);
        public ClientDto Edit(int id, ClientCreateDto clientCreateDto, [Service] ServiceDeskDbContext context);
        public void Delete(int id, [Service] ServiceDeskDbContext context);
    }
}
