using System.Collections.Generic;
using System.Linq;
using ServiceDesk.Api.Systems.Common.Implemetations.Handler;
using ServiceDesk.Api.Systems.PersonalAreaSystem.Dtos.Client;
using ServiceDesk.Core.Interfaces.Factories.PersonalAreaSystem;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;

namespace ServiceDesk.Api.Systems.PersonalAreaSystem.Handlers.Client
{
    public class ClientHandler : GenericHandler<Core.Entities.PersonalAreaSystem.Client>, IClientHandler
    {
        private readonly IClientFactory<ClientData> clientFactory;

        public ClientHandler(IClientFactory<ClientData> clientFactory)
        {
            this.clientFactory = clientFactory;
        }

        public void CreateWithLicenses(ClientData data, List<int> licenseIds, ServiceDeskDbContext context)
        {
            var client = clientFactory.Create(data);

            context.Clients.Add(client);
            context.SaveChanges();

            AttachLicenses(client, licenseIds, context);
        }

        public void EditWithLicenses(int clientId, ClientCreateDto clientCreateDto, ServiceDeskDbContext context)
        {
            var client = context.Clients.Find(clientId);

            client.Name = clientCreateDto.Name;
            client.Licenses.Clear();
            
            context.Clients.Update(client);
            context.SaveChanges();
            
            AttachLicenses(client, clientCreateDto.LicenseIds, context);
        }

        private void AttachLicenses(Core.Entities.PersonalAreaSystem.Client client, 
            List<int> licenseIds, 
            ServiceDeskDbContext context)
        {
            var licenses = context.Licenses
                .Where(x => licenseIds.Contains(x.Id))
                .ToList();

            foreach (var license in licenses)
            {
                license.ClientId = client.Id;
            }

            context.Licenses.UpdateRange(licenses);
            context.SaveChanges();
        }

        public override void Delete(int entityId, ServiceDeskDbContext context, out bool isSuccess)
        {
            var licenses = context.Licenses
                .Where(x => x.ClientId == entityId)
                .ToList();

            foreach (var license in licenses)
            {
                license.ClientId = null;
            }

            context.Licenses.UpdateRange(licenses);
            context.SaveChanges();

            base.Delete(entityId, context, out isSuccess);
        }
    }
}
