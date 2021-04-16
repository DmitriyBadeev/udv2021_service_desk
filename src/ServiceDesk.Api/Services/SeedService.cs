using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Services
{
    public class SeedService : ISeedDataService
    {
        private readonly ILogger<SeedService> _logger;
        private readonly IConfiguration _configuration;
        private readonly ServiceDeskDbContext _dbContext;

        public SeedService(ILogger<SeedService> logger,
            IConfiguration configuration, ServiceDeskDbContext dbContext)
        {
            _logger = logger;
            _configuration = configuration;
            _dbContext = dbContext;
        }

        public void Initialise()
        {
            _logger.LogInformation("Seeding database");
            
            if (_dbContext.Database.GetPendingMigrations().Any())
            {
                _logger.LogInformation("Migrating database");
                _dbContext.Database.Migrate();
                _logger.LogInformation("Database has migrated successfully");
            }
            
            _logger.LogInformation("Database has seeded successfully");
        }
    }
}