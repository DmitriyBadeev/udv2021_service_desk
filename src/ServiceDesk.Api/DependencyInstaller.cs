using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;
using Hangfire.Common;
using Hangfire.SqlServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ServiceDesk.Api.BackgroundTasks.ErrorFilter;
using ServiceDesk.Api.Services.BackgroundTasks;
using ServiceDesk.Api.Services.FilesManager;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.EnumHelper;

namespace ServiceDesk.Api
{
    public class DependencyInstaller
    {
        private IConfiguration configuration;

        public DependencyInstaller(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void Install(IServiceCollection services)
        {
            services.AddDbContext<ServiceDeskDbContext>(x => x
                .UseLazyLoadingProxies()
                .UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
                .LogTo(Console.WriteLine, LogLevel.Information));

            var options = new SqlServerStorageOptions
            {
                SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
                QueuePollInterval = TimeSpan.Zero,
                CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
                UseRecommendedIsolationLevel = true,
                DisableGlobalLocks = true
            };

            services.AddHangfire(x => x
                .UseSqlServerStorage(configuration.GetConnectionString("HangfireConnection"), options)
                .UseSerializerSettings(new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.Objects
                }));

            services.AddTransient<IEnumHelper, EnumHelper>();
            services.AddTransient<IFilesManager, FilesManager>();
            services.AddTransient<ILicenseCheckerService, LicenseCheckerService>();

            services.AddErrorFilter<GraphQlErrorFilter>();

            services.Scan(scan => scan
                .FromApplicationDependencies()
                .AddClasses(classes => classes
                    .InNamespaces("ServiceDesk.Infrastructure.Implementations.Factories")
                    .Where(type => type.Name.EndsWith("Factory")))
                .AsImplementedInterfaces()
                .WithTransientLifetime());

            services.Scan(scan => scan
                .FromApplicationDependencies()
                .AddClasses(classes => classes
                    .InNamespaces("ServiceDesk.Api.Systems")
                    .Where(type => type.Name.Contains("Builder")))
                .AsImplementedInterfaces()
                .WithTransientLifetime());

            services.Scan(scan => scan
                .FromApplicationDependencies()
                .AddClasses(classes => classes
                    .InNamespaces("ServiceDesk.Api.Systems")
                    .Where(type => type.Name.EndsWith("Handler")))
                .AsImplementedInterfaces()
                .WithTransientLifetime());

            RegisterBackgroundTasks(services);
        }

        private void RegisterBackgroundTasks(IServiceCollection services)
        {
            JobStorage.Current = new SqlServerStorage(configuration.GetConnectionString("HangfireConnection"));

            var licenseCheckerService = services
                .BuildServiceProvider()
                .GetRequiredService<ILicenseCheckerService>();

            RecurringJob.AddOrUpdate(() => licenseCheckerService.LicenseCheck(), Cron.Daily(22));
        }
    }
}
