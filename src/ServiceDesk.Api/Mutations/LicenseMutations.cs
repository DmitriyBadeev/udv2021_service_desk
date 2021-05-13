using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.License;
using ServiceDesk.Api.Systems.DirectorySystem.Dtos.License;
using ServiceDesk.Api.Systems.DirectorySystem.Handlers.License;
using ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Comment;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Comment;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.DirectorySystem;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;

namespace ServiceDesk.Api.Mutations
{
    [ExtendObjectType(Name = "Mutations")]
    public class LicenseMutations
    {
        private readonly ILicenseHandler licenseHandler;

        public LicenseMutations(ILicenseHandler licenseHandler)
        {
            this.licenseHandler = licenseHandler;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public LicenseDto CreateLicense(LicenseCreateDto licenseCreateDto,
            [Service] ServiceDeskDbContext context)
        {
            var licenseData = new LicenseData()
            {
                StartDate = licenseCreateDto.StartDate,
                ExpiresDate = licenseCreateDto.ExpiresDate,
                ClientId = licenseCreateDto.ClientId,
                CountOfUsers = licenseCreateDto.CountOfUsers,
                Number = licenseCreateDto.Number,
                SoftwareId = licenseCreateDto.SoftwareId
            };

            var license = licenseHandler.Create<LicenseFactory,
                LicenseDtoBuilder,
                LicenseData,
                LicenseDto>(licenseData, context);

            return license;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public LicenseDto EditLicense(int id, LicenseCreateDto licenseCreateDto, [Service] ServiceDeskDbContext context)
        {
            var license = licenseHandler.Edit<LicenseDtoBuilder,
                LicenseDto,
                LicenseCreateDto>(id, licenseCreateDto, context);

            return license;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string DeleteLicense(int id, [Service] ServiceDeskDbContext context)
        {
            bool isSuccess;
            licenseHandler.Delete(id, context, out isSuccess);

            if (isSuccess)
            {
                return "Ok";
            }

            return "Error";
        }
    }
}
