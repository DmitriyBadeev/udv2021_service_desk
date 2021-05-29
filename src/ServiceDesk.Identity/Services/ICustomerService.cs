using System.Threading.Tasks;
using ServiceDesk.Identity.Controllers.Profile.dto;
using ServiceDesk.Identity.Models;

namespace ServiceDesk.Identity.Services
{
    public interface ICustomerService
    {
        Task<bool> ChangeRoleToOwner(ApplicationUser user);

        Task<bool> ChangeRoleToCustomer(ApplicationUser user);

        Task<string> GetRole(ApplicationUser authUser);

        int? GetClientId(string userId);

        UserDataDto GetUserData(ApplicationUser user, string role, int? clientId, bool canEdit);

        bool CanEditProfile(string authRole, string editedRole, int? authClientId,
            int? editedClientId, bool isMyProfile);

        Task RemoveUserFromCustomer(int? customerId, string userId);

        bool IsCreatePossible(int clientId, int licenseId);
    }
}