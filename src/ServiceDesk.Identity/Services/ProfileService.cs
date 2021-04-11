using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using ServiceDesk.Identity.Models;

namespace ServiceDesk.Identity.Services
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ProfileService(UserManager<ApplicationUser> userManager, 
            IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _claimsFactory = claimsFactory;
            _roleManager = roleManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var userId = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(userId);
            var principal = await _claimsFactory.CreateAsync(user);
            
            var claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();
            
            // Adding custom claims
            claims.Add(new Claim("user_id", userId ?? string.Empty));
            claims.Add(new Claim("first_name", user.FirstName ?? string.Empty));
            claims.Add(new Claim("last_name", user.LastName ?? string.Empty));
            claims.Add(new Claim("patronymic", user.Patronymic ?? string.Empty));
            claims.Add(new Claim("email", user.Email ?? string.Empty));
            claims.Add(new Claim("is_banned", user.IsBanned.ToString()));
            claims.Add(new Claim("register_date", user.RegisterDate.ToString(CultureInfo.InvariantCulture)));

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();
            claims.Add(new Claim("role", role ?? string.Empty));
            
            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var userId = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(userId);
            context.IsActive = user != null;
        }
    }
}