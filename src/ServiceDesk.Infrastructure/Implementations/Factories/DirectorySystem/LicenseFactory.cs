using System;
using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.DirectorySystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.DirectorySystem
{
    public class LicenseData : IFactoryData
    {
        public string Number { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public int CountOfUsers { get; set; }
        public int? ClientId { get; set; }
        public int SoftwareId { get; set; }
    }

    public class LicenseFactory : ILicenseFactory<LicenseData>
    {
        public License Create(LicenseData data)
        {
            var license = new License()
            {
                Number = data.Number,
                StartDate = data.StartDate,
                ExpiresDate = data.ExpiresDate,
                CountOfUsers = data.CountOfUsers,
                ClientId = data.ClientId,
                SoftwareId = data.SoftwareId
            };

            return license;
        }
    }
}
