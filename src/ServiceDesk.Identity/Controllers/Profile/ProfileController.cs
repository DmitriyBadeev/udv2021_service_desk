using System.Collections.Generic;
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
        private readonly ICustomerService _customerService;

        public ProfileController(UserManager<ApplicationUser> userManager, 
            ICustomerService customerService)
        {
            _userManager = userManager;
            _customerService = customerService;
        }
        
        [HttpGet]
        public async Task<ActionResult> Index([FromQuery] string userId)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);
            var authRole = await _customerService.GetRole(authUser);
            
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }
            
            var role = await _customerService.GetRole(user);
            
            var clientId = _customerService.GetClientId(userId);
            var clientAuthUserId = _customerService.GetClientId(authUserId);

            var canEdit = _customerService.CanEditProfile(authRole, role, clientAuthUserId,
                clientId, authUserId == userId);
            
            if (authRole == SeedConfig.DEVELOPER_ROLE)
            {
                var userData = _customerService.GetUserData(user, role, clientId, canEdit);
                return Ok(userData);
            }
            
            if (clientAuthUserId == clientId)
            {
                var userData = _customerService.GetUserData(user, role, clientId, canEdit);
                return Ok(userData);
            }

            return Unauthorized();
        }

        [HttpGet("/profile/all")]
        [Authorize(IdentityServerConstants.LocalApi.PolicyName, Roles = SeedConfig.DEVELOPER_ROLE)]
        public async Task<ActionResult> GetAll()
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var users = _userManager.Users;
            var usersData = new List<UserDataDto>();
            
            foreach (var user in users)
            {
                var role = await _customerService.GetRole(user);
                var clientId = _customerService.GetClientId(user.Id);

                var canEdit = role != SeedConfig.DEVELOPER_ROLE || authUserId == user.Id;
                var userData = _customerService.GetUserData(user, role, clientId, canEdit);
                
                usersData.Add(userData);
            }
        
            return Ok(usersData);
        }
        
        [HttpGet("/profile/username")]
        [AllowAnonymous]
        public async Task<ActionResult> GetUserName([FromQuery] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }
            
            var firstName = user.FirstName;
            var lastName = user.LastName;
            var patronymic = user.Patronymic;

            var username = new Username()
            {
                LastName = lastName,
                FirstName = firstName,
                Patronymic = patronymic
            };

            return Ok(username);
        }

        [HttpPost]
        public async Task<ActionResult> Index([FromBody] EditUserData editUserData)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);
            var authRole = await _customerService.GetRole(authUser);

            var editedUser = await _userManager.FindByIdAsync(editUserData.UserId);

            if (editedUser == null)
            {
                return NotFound();
            }
            
            var editedUserRole = await _customerService.GetRole(editedUser);
            
            var authClientId = _customerService.GetClientId(authUserId);
            var editedClientId = _customerService.GetClientId(editUserData.UserId);
            
            var canEdit = _customerService.CanEditProfile(authRole, editedUserRole, authClientId,
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

            return Unauthorized();
        }

        [HttpPost("/change-password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordData data)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);
            var authRole = await _customerService.GetRole(authUser);

            var editedUser = await _userManager.FindByIdAsync(data.UserId);
            var editedUserRole = await _customerService.GetRole(editedUser);
            
            var authClientId = _customerService.GetClientId(authUserId);
            var editedClientId = _customerService.GetClientId(data.UserId);
            
            var canEdit = _customerService.CanEditProfile(authRole, editedUserRole, authClientId,
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

            return Unauthorized();
        }

        [HttpPost("/profile/delete")]
        public async Task<ActionResult> DeleteUser([FromQuery] string userId)
        {
            var authUserId = HttpContext.User.GetSubjectId();
            var authUser = await _userManager.FindByIdAsync(authUserId);
            var authRole = await _customerService.GetRole(authUser);
        
            var removedUser = await _userManager.FindByIdAsync(userId);
            if (removedUser == null)
            {
                return NotFound();
            }
            
            var removedUserRole = await _customerService.GetRole(removedUser);
            
            var authClientId = _customerService.GetClientId(authUserId);
            var removedClientId = _customerService.GetClientId(userId);
            
            var canRemove = _customerService.CanEditProfile(authRole, removedUserRole, authClientId,
                removedClientId, authUserId == userId);
        
            if (canRemove)
            {
                await _customerService.RemoveUserFromCustomer(removedClientId, userId);
                var result = await _userManager.DeleteAsync(removedUser);
        
                if (result.Succeeded)
                {
                    return Ok();
                }
                
                return BadRequest(result.Errors);
            }
            
            return Unauthorized();
        }
    }
}