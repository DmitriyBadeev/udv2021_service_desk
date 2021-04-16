using System.Linq;
using System.Threading.Tasks;
using IdentityServer4;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Identity.Models;
using ServiceDesk.Identity.Services;

namespace ServiceDesk.Identity.Controllers.Customer
{
    [Authorize(IdentityServerConstants.LocalApi.PolicyName)]
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICustomerService _customerService;

        public CustomerController(ApplicationDbContext applicationDbContext, 
            UserManager<ApplicationUser> userManager, ICustomerService customerService)
        {
            _applicationDbContext = applicationDbContext;
            _userManager = userManager;
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IActionResult> Index([FromQuery] int clientId)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);
            var authRole = await _customerService.GetRole(authUser);
            var clientAuthUserId = _customerService.GetClientId(authUserId);

            if (authRole == SeedConfig.DEVELOPER_ROLE || clientId == clientAuthUserId)
            {
                var clientUsers = _applicationDbContext.ClientUsers
                    .Where(cu => cu.ClientId == clientId)
                    .Include(cu => cu.User)
                    .Select(cu => cu.User)
                    .ToList();

                var usersData = clientUsers.Select(u =>
                {
                    var role = _customerService.GetRole(u).GetAwaiter().GetResult();
                    var canEdit = _customerService.CanEditProfile(authRole, role, clientAuthUserId, clientId,
                        u.Id == authUserId);
                    return _customerService.GetUserData(u, role, clientId, canEdit);
                });
               
                return Ok(usersData);
            }

            return Unauthorized();
        }
    }
}