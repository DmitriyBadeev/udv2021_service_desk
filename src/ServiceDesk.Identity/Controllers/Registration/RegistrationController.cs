using System;
using System.Threading.Tasks;
using IdentityServer4;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Identity.Controllers.Registration.dto;
using ServiceDesk.Identity.Models;
using ServiceDesk.Identity.Services;

namespace ServiceDesk.Identity.Controllers.Registration
{
    public class RegistrationController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _applicationDbContext;

        public RegistrationController(UserManager<ApplicationUser> userManager, ApplicationDbContext applicationDbContext)
        {
            _userManager = userManager;
            _applicationDbContext = applicationDbContext;
        }
        
        [Authorize(IdentityServerConstants.LocalApi.PolicyName)]
        [HttpPost("/registration/customer")]
        public async Task<IActionResult> CustomerRegistration([FromBody] CustomerRegistrationDto data)
        {
            if (data.Role != SeedConfig.OWNER_ROLE && data.Role != SeedConfig.CUSTOMER_ROLE)
            {
                return BadRequest("Неверная роль");
            }
            
            var userCustomerEntity = new ApplicationUser
            {
                Email = data.Email,
                UserName = data.Email,
                EmailConfirmed = true,
                LastName = data.LastName,
                FirstName = data.FirstName,
                Patronymic = data.Patronymic,
                RegisterDate = DateTime.Now
            };

            var registrationResult = await _userManager.CreateAsync(userCustomerEntity, data.Password);
            
            if (registrationResult.Succeeded)
            {
                var createdCustomerUser = await _userManager.FindByEmailAsync(data.Email);
                
                var addRoleResult = await _userManager.AddToRoleAsync(createdCustomerUser, data.Role);

                if (addRoleResult.Succeeded)
                {
                    var clientUser = new ClientUser()
                    {
                        User = createdCustomerUser, 
                        ClientId = data.ClientId, 
                        UserId = createdCustomerUser.Id
                    };
                
                    await _applicationDbContext.ClientUsers.AddAsync(clientUser);
                    await _applicationDbContext.SaveChangesAsync();
                    return Ok();
                }

                return BadRequest(addRoleResult.Errors);
            }

            return BadRequest(registrationResult.Errors);
        }

        [Authorize(IdentityServerConstants.LocalApi.PolicyName, Roles = SeedConfig.DEVELOPER_ROLE)]
        [HttpPost("/registration/developer")]
        public async Task<IActionResult> DeveloperRegistration([FromBody] DeveloperRegistrationDto data)
        {
            var userEntity = new ApplicationUser
            {
                Email = data.Email,
                UserName = data.Email,
                EmailConfirmed = true,
                LastName = data.LastName,
                FirstName = data.FirstName,
                Patronymic = data.Patronymic,
                RegisterDate = DateTime.Now
            };
            
            var registrationResult = await _userManager.CreateAsync(userEntity, data.Password);
            
            if (registrationResult.Succeeded)
            {
                var createdCustomerUser = await _userManager.FindByEmailAsync(data.Email);
                
                var addRoleResult = await _userManager.AddToRoleAsync(createdCustomerUser, SeedConfig.DEVELOPER_ROLE);

                if (addRoleResult.Succeeded)
                {
                    return Ok();
                }

                return BadRequest(addRoleResult.Errors);
            }

            return BadRequest(registrationResult.Errors);
        }
    }
}