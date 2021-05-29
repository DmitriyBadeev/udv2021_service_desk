using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Identity.Models;

namespace ServiceDesk.Identity
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<ClientUser> ClientUsers { get; set; }
        public DbSet<ClientLicense> ClientLicenses { get; set; }
    }
}