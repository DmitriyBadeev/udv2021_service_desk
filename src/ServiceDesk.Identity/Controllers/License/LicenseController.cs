using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Identity.Controllers.License.dto;
using ServiceDesk.Identity.Models;

namespace ServiceDesk.Identity.Controllers.License
{
    public class LicenseController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public LicenseController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public IActionResult CreateClientLicense(ClientLicenseCreateDto clientLicenseCreateDto)
        {
            var clientLicense = new ClientLicense()
            {
                ClientId = clientLicenseCreateDto.ClientId,
                LicenseId = clientLicenseCreateDto.LicenseId,
                CountOfUsers = clientLicenseCreateDto.CountOfUsers
            };

            _applicationDbContext.ClientLicenses.Add(clientLicense);
            _applicationDbContext.SaveChanges();

            return Ok();
        }
    }
}
