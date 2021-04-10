using System;
using System.Collections.Generic;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ServiceDesk.Identity.Models;

namespace ServiceDesk.Identity.Services
{
    public class SeedService : ISeedDataService
    {
        const string DEVELOPER_ROLE = "DEVELOPER";
        const string CUSTOMER_ROLE = "CUSTOMER";
        const string OWNER_ROLE = "OWNER";

        private const string GOD_USER_NAME = "GodUser";
        
        private readonly ILogger<SeedService> _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly PersistedGrantDbContext _persistedGrantDbContext;
        private readonly ConfigurationDbContext _configurationDbContext;
        private readonly IConfiguration _configuration;

        public SeedService(ILogger<SeedService> logger, UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager, ApplicationDbContext applicationDbContext, 
            PersistedGrantDbContext persistedGrantDbContext, ConfigurationDbContext configurationDbContext, 
            IConfiguration configuration)
        {
            _logger = logger;
            _userManager = userManager;
            _applicationDbContext = applicationDbContext;
            _persistedGrantDbContext = persistedGrantDbContext;
            _configurationDbContext = configurationDbContext;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public void Initialise()
        {
            _logger.LogInformation("Seeding database");
            
            if (_applicationDbContext.Database.GetPendingMigrations().Any())
            {
                _logger.LogInformation("Migrating identity database");
                _applicationDbContext.Database.Migrate();
                _logger.LogInformation("Database identity has migrated successfully");
            }

            if (_persistedGrantDbContext.Database.GetPendingMigrations().Any())
            {
                _logger.LogInformation("Migrating persisted grant database");
                _persistedGrantDbContext.Database.Migrate();
                _logger.LogInformation("Database persisted grant has migrated successfully");
            }

            if (_configurationDbContext.Database.GetPendingMigrations().Any())
            {
                _logger.LogInformation("Migrating configuration database");
                _configurationDbContext.Database.Migrate();
                _logger.LogInformation("Database configuration has migrated successfully");
            }
            
            var email = _configuration["email"];
            var password = _configuration["password"];
            
            var financeClientId = _configuration["clientId"];
            var financeRedirects = _configuration.GetSection("redirect_uris").Get<List<string>>();
            var apiFinance = _configuration["api"];
            
            if (!_configurationDbContext.Clients.Any())
            {
                foreach (var client in Config.GetSpaClient(financeClientId, financeRedirects, apiFinance))
                {
                    _configurationDbContext.Clients.Add(client.ToEntity());
                }
                _configurationDbContext.SaveChanges();
            }

            if (!_configurationDbContext.IdentityResources.Any())
            {
                foreach (var resource in Config.GetIdentityResources())
                {
                    _configurationDbContext.IdentityResources.Add(resource.ToEntity());
                }
                _configurationDbContext.SaveChanges();
            }
            
            if (!_configurationDbContext.ApiResources.Any())
            {
                foreach (var resource in Config.GetApiResources(apiFinance))
                {
                    _configurationDbContext.ApiResources.Add(resource.ToEntity());
                }
                _configurationDbContext.SaveChanges();
            }
            
            AddRoles();
            AddGodUser(email, password);

            _logger.LogInformation("Database has seeded successfully");
        }

        private void AddGodUser(string email, string password)
        {
            var user = _userManager.FindByEmailAsync(email).GetAwaiter().GetResult();

            if (user == null)
            {
                _logger.LogInformation("Creating user");

                var userEntity = new ApplicationUser
                {
                    Email = email,
                    UserName = GOD_USER_NAME,
                    EmailConfirmed = true,
                    LastName = "Главный",
                    FirstName = "Администратор",
                    Patronymic = "Системы",
                    RegisterDate = DateTime.Now
                };

                var creatingUserResult = _userManager.CreateAsync(userEntity, password).GetAwaiter().GetResult();

                var createdUser = _userManager.FindByNameAsync(GOD_USER_NAME).GetAwaiter().GetResult();
                var addingRoleResult = _userManager.AddToRoleAsync(createdUser, DEVELOPER_ROLE).GetAwaiter().GetResult();

                if (creatingUserResult.Succeeded)
                {
                    _logger.LogInformation("User created");
                }
                else
                {
                    _logger.LogCritical("User hasn't been created");
                }

                if (addingRoleResult.Succeeded)
                {
                    _logger.LogInformation("User role added");
                }
                else
                {
                    _logger.LogCritical("User role hasn't been added");
                }
            }
            else
            {
                _logger.LogInformation("User already created");
            }

            var customerEmail = "ivanov@mail.ru";
            var customerUser = _userManager.FindByEmailAsync(customerEmail).GetAwaiter().GetResult();

            if (customerUser == null)
            {
                var userCustomerEntity = new ApplicationUser
                {
                    Email = customerEmail,
                    UserName = "ivanov",
                    EmailConfirmed = true,
                    LastName = "Иванов",
                    FirstName = "Иван",
                    Patronymic = "Иванович",
                    RegisterDate = DateTime.Now
                };

                _userManager.CreateAsync(userCustomerEntity, password).GetAwaiter().GetResult();

                var createdCustomerUser = _userManager.FindByNameAsync("ivanov").GetAwaiter().GetResult();
                _userManager.AddToRoleAsync(createdCustomerUser, CUSTOMER_ROLE).GetAwaiter().GetResult();
            }
            
        }

        private void AddRoles()
        {
            var isDeveloperRoleExist = _roleManager.RoleExistsAsync(DEVELOPER_ROLE).GetAwaiter().GetResult();

            if (!isDeveloperRoleExist)
            {
                _logger.LogInformation("Creating roles");

                var developerRole = new IdentityRole(DEVELOPER_ROLE);
                var customerRole = new IdentityRole(CUSTOMER_ROLE);
                var ownerRole = new IdentityRole(OWNER_ROLE);

                var result1 = _roleManager.CreateAsync(developerRole).GetAwaiter().GetResult();
                var result2 = _roleManager.CreateAsync(customerRole).GetAwaiter().GetResult();
                var result3 = _roleManager.CreateAsync(ownerRole).GetAwaiter().GetResult();

                if (result1.Succeeded && result2.Succeeded && result3.Succeeded)
                {
                    _logger.LogInformation("Roles created");
                }
            }
            else
            {
                _logger.LogInformation("Roles already created");
            }
        }
    }
}