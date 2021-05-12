using System.Collections.Generic;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.License;
using ServiceDesk.Api.Systems.DirectorySystem.Dtos.License;
using ServiceDesk.Api.Systems.DirectorySystem.Handlers.License;
using ServiceDesk.Api.Systems.PersonalAreaSystem.DtoBuilders.Client;
using ServiceDesk.Api.Systems.PersonalAreaSystem.Dtos.Client;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType(Name = "Queries")]
    public class LicenseQueries
    {
        private readonly ILicenseHandler licenseHandler;

        public LicenseQueries(ILicenseHandler licenseHandler)
        {
            this.licenseHandler = licenseHandler;
        }

        //[Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public LicenseDto GetLicense(int licenseId, [Service] ServiceDeskDbContext context)
        {
            var license = licenseHandler.Get<LicenseDtoBuilder, LicenseDto>(licenseId, context);

            return license;
        }

        //[Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public IEnumerable<LicenseDto> GetLicenses([Service] ServiceDeskDbContext context)
        {
            var licenses = licenseHandler.GetAll<LicenseDtoBuilder, LicenseDto>(context);

            return licenses;
        }

        //[Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public IEnumerable<LicenseDto> PageLicenses(int pageNumber, int count, [Service] ServiceDeskDbContext context)
        {
            var licenses = licenseHandler.Page<LicenseDtoBuilder, LicenseDto>(pageNumber, count, context);

            return licenses;
        }
    }
}
