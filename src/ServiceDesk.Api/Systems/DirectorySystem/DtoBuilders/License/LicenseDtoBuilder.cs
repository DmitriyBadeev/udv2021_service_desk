using ServiceDesk.Api.Systems.DirectorySystem.Dtos.License;

namespace ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.License
{
    public class LicenseDtoBuilder : ILicenseDtoBuilder<LicenseDto>
    {
        public LicenseDto Build(Core.Entities.DirectorySystem.License license)
        {
            var licenseDto = new LicenseDto()
            { 
                Id = license.Id,
                Number = license.Number,
                Client = license.Client.Name,
                CountOfUsers = license.CountOfUsers,
                ExpiresDate = license.ExpiresDate,
                Software = license.Software.Title,
                StartDate = license.StartDate
            };

            return licenseDto;
        }
    }
}
