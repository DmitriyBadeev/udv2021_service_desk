using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Dtos.Client;

namespace ServiceDesk.Api.Handlers.PersonalAreaSystem
{
    public interface IClientHandler
    {
        public ClientDto Create(ClientCreateDto clientCreateDto);
        public ClientDto Get(int clientId);
        public IEnumerable<ClientListDto> GetAll();
        public IEnumerable<ClientListDto> Page(int pageNumber, int count);
        public ClientDto Edit(int id, ClientCreateDto clientCreateDto);
        public void Delete(int id);
    }
}
