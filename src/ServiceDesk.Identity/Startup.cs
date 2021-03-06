using System;
using System.Reflection;
using System.Security.Claims;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ServiceDesk.Identity.Models;
using ServiceDesk.Identity.Services;

namespace ServiceDesk.Identity
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            _environment = environment;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddSingleton<ICorsPolicyService>((container) => {
                var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
                return new DefaultCorsPolicyService(logger) {
                    AllowAll = true,
                };
            });

            services.AddLocalApiAuthentication();
            services
                .AddDbContext<ApplicationDbContext>(config =>
                {
                    config.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
                })
                .AddIdentity<ApplicationUser, IdentityRole>(config =>
                {
                    config.Password.RequireDigit = false;
                    config.Password.RequireLowercase = false;
                    config.Password.RequireNonAlphanumeric = false;
                    config.Password.RequireUppercase = false;
                    config.Password.RequiredLength = 5;
                    config.User.RequireUniqueEmail = true;
                    config.User.AllowedUserNameCharacters = 
                        config.User.AllowedUserNameCharacters.Insert(0, "абвгдеёжзийклмнопрстуфхцчшщъыьэюя АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ");
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            
            var rsa = new RsaKeyService(_environment, TimeSpan.FromDays(120));
            services.AddSingleton(provider => rsa);
            services.AddScoped<ISeedDataService, SeedService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddMvc();
            
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services
                .AddIdentityServer()
                .AddAspNetIdentity<ApplicationUser>()
                .AddSigningCredential(rsa.GetKey())
                .AddProfileService<ProfileService>()
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                            sql => sql.MigrationsAssembly(migrationsAssembly));
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                            sql => sql.MigrationsAssembly(migrationsAssembly));
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 3600 * 10;
                });
            
                services.AddAuthentication();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseCors(config => config
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());
            
            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
