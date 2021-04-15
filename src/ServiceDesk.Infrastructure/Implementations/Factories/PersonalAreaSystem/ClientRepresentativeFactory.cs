using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.PersonalAreaSystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem
{
    public class ClientRepresentativeData : IFactoryData
    {
        public string UserId { get; set; }
        public int ClientId { get; set; }
    }

    public class ClientRepresentativeFactory : IClientRepresentativeFactory<ClientRepresentativeData>
    {
        public ClientRepresentative Create(ClientRepresentativeData data)
        {
            var clientRepresentative = new ClientRepresentative()
            {
                UserId = data.UserId,
                ClientId = data.ClientId
            };

            return clientRepresentative;
        }
    }
}
