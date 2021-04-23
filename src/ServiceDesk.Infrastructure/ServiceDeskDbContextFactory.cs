using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ServiceDesk.Infrastructure
{
    public class ServiceDeskDbContextFactory : IDesignTimeDbContextFactory<ServiceDeskDbContext>
    {
        public ServiceDeskDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ServiceDeskDbContext>();
            
            builder.UseSqlServer("Server=localhost\\SQLEXPRESS;Initial Catalog=service_desk;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;MultipleActiveResultSets=True;");
            
            return new ServiceDeskDbContext(builder.Options);
        }
    }
}