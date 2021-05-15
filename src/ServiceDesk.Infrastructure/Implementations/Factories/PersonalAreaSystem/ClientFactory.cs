using System;
using System.Collections.Generic;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.PersonalAreaSystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem
{
    public class ClientData : IFactoryData
    {
        public string Name { get; set; }
    }

    public class ClientFactory : IClientFactory<ClientData>
    {
        public Client Create(ClientData data)
        {
            var client = new Client()
            {
                Name = data.Name,
                IsActive = true,
                CreationDate = DateTime.Now
            };

            return client;
        }
    }
}
