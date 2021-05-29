using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Services.BackgroundTasks
{
    public class LicenseCheckerService : ILicenseCheckerService
    {
        private readonly ServiceDeskDbContext context;

        public LicenseCheckerService(ServiceDeskDbContext context)
        {
            this.context = context;
        }

        public void LicenseCheck()
        {
            var clients = context.Clients
                .Where(x => x.IsActive)
                .Include(x => x.Licenses)
                .ToList();

            foreach (var client in clients)
            {
                if (client.Licenses.All(x => x.ExpiresDate < DateTime.Now))
                {
                    client.IsActive = false;
                }

                var lockDate = DateTime.MinValue;

                foreach (var license in client.Licenses)
                {
                    if (license.ExpiresDate > lockDate)
                    {
                        lockDate = license.ExpiresDate;
                    }
                }

                client.LockDate = lockDate;
            }

            context.Clients.UpdateRange(clients);
            context.SaveChanges();
        }
    }
}
