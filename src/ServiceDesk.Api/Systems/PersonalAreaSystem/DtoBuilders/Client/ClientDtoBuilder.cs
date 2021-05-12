﻿using ServiceDesk.Api.Systems.PersonalAreaSystem.Dtos.Client;

namespace ServiceDesk.Api.Systems.PersonalAreaSystem.DtoBuilders.Client
{
    public class ClientDtoBuilder : IClientDtoBuilder<ClientDto>
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
    }
}