using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ServiceDesk.Identity.Controllers.Profile.dto;
using ServiceDesk.Identity.Models;

namespace ServiceDesk.Identity.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _applicationDbContext;

        public CustomerService(UserManager<ApplicationUser> userManager, 
            ApplicationDbContext applicationDbContext)
        {
            _userManager = userManager;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<string> GetRole(ApplicationUser authUser)
        {
            var roles = await _userManager.GetRolesAsync(authUser);
            
            return roles.FirstOrDefault();
        }

        public int? GetClientId(string userId)
        {
            return _applicationDbContext.ClientUsers
                .FirstOrDefault(cu => cu.UserId == userId)?
                .ClientId;
        }
        
        public UserDataDto GetUserData(ApplicationUser user, string role, int? clientId, bool canEdit)
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
        
        public bool CanEditProfile(string authRole, string editedRole, int? authClientId, 
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
    }
}