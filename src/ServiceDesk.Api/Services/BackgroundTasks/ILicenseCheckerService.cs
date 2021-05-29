using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Api.Services.BackgroundTasks
{
    public interface ILicenseCheckerService
    {
        public void LicenseCheck();
    }
}
