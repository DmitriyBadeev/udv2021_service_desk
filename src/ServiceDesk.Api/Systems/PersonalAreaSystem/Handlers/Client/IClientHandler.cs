using System.Collections.Generic;
using ServiceDesk.Api.Systems.Common.Interfaces.Handler;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;

namespace ServiceDesk.Api.Systems.PersonalAreaSystem.Handlers.Client
{
    public interface IClientHandler : IGenericHandler<Core.Entities.PersonalAreaSystem.Client>
    {
        public void CreateWithLicenses(ClientData data, List<int> licenseIds, ServiceDeskDbContext context);
    }
}
