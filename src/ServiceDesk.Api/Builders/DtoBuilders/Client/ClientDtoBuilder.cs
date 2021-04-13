using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Dtos.Client;

namespace ServiceDesk.Api.Builders.DtoBuilders.Client
{
    public class ClientDtoBuilder : IClientDtoBuilder
    {
        public ClientDto Build(Core.Entities.PersonalAreaSystem.Client client)
        {
            var clientDto = new ClientDto()
            { 
                Id = client.Id,
                CreationDate = client.CreationDate,
                IsActive = client.IsActive,
                LockDate = client.LockDate,
                Name = client.Name
            };

            return clientDto;
        }

        public ClientListDto BuildListItem(Core.Entities.PersonalAreaSystem.Client client)
        {
            var clientListDto = new ClientListDto()
            {
                Id = client.Id,
                CreationDate = client.CreationDate,
                IsActive = client.IsActive,
                LockDate = client.LockDate,
                Name = client.Name
            };

            return clientListDto;
        }
    }
}
