using System.Collections.Generic;
using ServiceDesk.Api.Systems.Common.Interfaces.Handler;
using ServiceDesk.Api.Systems.PersonalAreaSystem.Dtos.Client;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;

namespace ServiceDesk.Api.Systems.PersonalAreaSystem.Handlers.Client
{
    public interface IClientHandler : IGenericHandler<Core.Entities.PersonalAreaSystem.Client>
    {
        public void CreateWithLicenses(ClientData data, List<int> licenseIds, ServiceDeskDbContext context);
        public void EditWithLicenses(int clientId, ClientCreateDto clientCreateDto, ServiceDeskDbContext context);
        public void Block(int clientId, ServiceDeskDbContext context);
        public void Unblock(int clientId, ServiceDeskDbContext context);
    }
}
