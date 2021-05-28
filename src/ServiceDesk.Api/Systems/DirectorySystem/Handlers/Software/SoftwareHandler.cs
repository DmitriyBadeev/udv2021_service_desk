using System.Linq;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Api.Systems.Common.Implemetations.Handler;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Systems.DirectorySystem.Handlers.Software
{
    public class SoftwareHandler : GenericHandler<Core.Entities.DirectorySystem.Software>, ISoftwareHandler
    {
        public override void Delete(int entityId, ServiceDeskDbContext context, out bool isSuccess)
        {
            var software = context.Softwares.Find(entityId);

            if (software != null)
            {
                UnattachRequests(software, context);

                context.Softwares.Remove(software);
                context.SaveChanges();

                isSuccess = true;
            }
            else
            {
                isSuccess = false;
            }
        }

        private void UnattachRequests(Core.Entities.DirectorySystem.Software software, ServiceDeskDbContext context)
        {
            var requests = software.SoftwareModules
                .SelectMany(x => x.Requests)
                .ToList();

            foreach (var request in requests)
            {
                request.SoftwareModuleId = null;
            }

            context.Requests.UpdateRange(requests);
            context.SaveChanges();
        }
    }
}
