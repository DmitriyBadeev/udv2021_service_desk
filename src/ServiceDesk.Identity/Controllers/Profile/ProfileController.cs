using System.Linq;
using System.Threading.Tasks;
using IdentityServer4;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ServiceDesk.Identity.Controllers.Profile.dto;
using ServiceDesk.Identity.Models;
using ServiceDesk.Identity.Services;

namespace ServiceDesk.Identity.Controllers.Profile
{
    [Authorize(IdentityServerConstants.LocalApi.PolicyName)]
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
        public async Task<ActionResult> Index([FromQuery] string userId)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);
            var authRole = await GetRole(authUser);
            
            var user = await _userManager.FindByIdAsync(userId);
            var role = await GetRole(user);
            
            var clientId = GetClientId(userId);
            var clientAuthUserId = GetClientId(authUserId);

            var canEdit = CanEditProfile(authRole, role, clientAuthUserId,
                clientId, authUserId == userId);
            
            if (authRole == SeedConfig.DEVELOPER_ROLE)
            {
                var userData = GetUserData(user, role, clientId, canEdit);
                return Ok(userData);
            }
            
            if (clientAuthUserId == clientId)
            {
                var userData = GetUserData(user, role, clientId, canEdit);
                return Ok(userData);
            }

            return Forbid();
        }

        [HttpPost]
        public async Task<ActionResult> Index([FromBody] EditUserData editUserData)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);
            var authRole = await GetRole(authUser);

            var editedUser = await _userManager.FindByIdAsync(editUserData.UserId);

            if (editedUser == null)
            {
                return NotFound();
            }
            
            var editedUserRole = await GetRole(editedUser);
            
            var authClientId = GetClientId(authUserId);
            var editedClientId = GetClientId(editUserData.UserId);
            
            var canEdit = CanEditProfile(authRole, editedUserRole, authClientId,
                editedClientId, authUserId == editUserData.UserId);

            if (canEdit)
            {
                if (editUserData.Email != editedUser.Email)
                {
                    var token = await _userManager.GenerateChangeEmailTokenAsync(editedUser, editUserData.Email);
                    await _userManager.ChangeEmailAsync(editedUser, editUserData.Email, token);
                }
                
                editedUser.FirstName = editUserData.FirstName;
                editedUser.LastName = editUserData.LastName;
                editedUser.Patronymic = editUserData.Patronymic;
                
                var result = await _userManager.UpdateAsync(editedUser);

                if (result.Succeeded)
                {
                    return Ok();
                }
                
                return BadRequest(result.Errors);
            }

            return Forbid();
        }

        [HttpPost("/change-password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordData data)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);
            var authRole = await GetRole(authUser);

            var editedUser = await _userManager.FindByIdAsync(data.UserId);
            var editedUserRole = await GetRole(editedUser);
            
            var authClientId = GetClientId(authUserId);
            var editedClientId = GetClientId(data.UserId);
            
            var canEdit = CanEditProfile(authRole, editedUserRole, authClientId,
                editedClientId, authUserId == data.UserId);

            if (canEdit)
            {
                var result = await _userManager.ChangePasswordAsync(editedUser, data.OldPassword, data.NewPassword);

                if (result.Succeeded)
                {
                    return Ok();
                }

                return BadRequest(result.Errors);
            }

            return Forbid();
        }

        private bool CanEditProfile(string authRole, string editedRole, int? authClientId, 
            int? editedClientId, bool isMyProfile)
        {
            if (isMyProfile)
                return true;
            
            if (authRole == SeedConfig.DEVELOPER_ROLE && editedRole == SeedConfig.DEVELOPER_ROLE) 
                return false;

            if (authRole == SeedConfig.DEVELOPER_ROLE)
                return true;

            if (authClientId == editedClientId && authRole == SeedConfig.OWNER_ROLE)
                return true;

            return false;
        }
        private async Task<string> GetRole(ApplicationUser authUser)
        {
            var roles = await _userManager.GetRolesAsync(authUser);
            
            return roles.FirstOrDefault();
        }

        private int? GetClientId(string userId)
        {
            return _applicationDbContext.ClientUsers
                .FirstOrDefault(cu => cu.UserId == userId)?
                .ClientId;
        }
        
        private UserDataDto GetUserData(ApplicationUser user, string role, int? clientId, bool canEdit)
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
                ClientId = clientId,
                CanEdit = canEdit
            };
        }
    }
}