using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Identity.Controllers.Profile.dto;
using ServiceDesk.Identity.Models;
using ServiceDesk.Identity.Services;

namespace ServiceDesk.Identity.Controllers.Profile
{
    public class ProfileController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _applicationDbContext;

        public ProfileController(UserManager<ApplicationUser> userManager, 
            ApplicationDbContext applicationDbContext)
        {
            _userManager = userManager;
            _applicationDbContext = applicationDbContext;
        }

        /// <summary>
        /// Get user profile
        /// </summary>
        [HttpGet]
        [Authorize]
        public async Task<ActionResult> Index([FromQuery] string userId)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);

            var authRoles = await _userManager.GetRolesAsync(authUser);
            
            var authRole = authRoles.FirstOrDefault();
            
            var user = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();
            var clientId = _applicationDbContext.ClientUsers
                .FirstOrDefault(cu => cu.UserId == userId)?
                .ClientId;
            
            if (authRole == SeedConfig.DEVELOPER_ROLE)
            {
                var userData = GetUserData(user, role, clientId);
                return Ok(userData);
            }
            
            var clientAuthUserId = _applicationDbContext.ClientUsers
                .FirstOrDefault(cu => cu.UserId == authUserId)?
                .ClientId;
            
            if (clientAuthUserId == clientId)
            {
                var userData = GetUserData(user, role, clientId);
                return Ok(userData);
            }

            return Forbid();
        }

        private UserDataDto GetUserData(ApplicationUser user, string role, int? clientId)
        {
            return new UserDataDto()
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Patronymic = user.Patronymic,
                Email = user.Email,
                Role = role,
                IsBanned = user.IsBanned,
                BanDate = user.BanDate,
                RegisterDate = user.RegisterDate,
                ClientId = clientId
            };
        }
    }
}