using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ServiceDesk.Api.BackgroundTasks.ErrorFilter;
using ServiceDesk.Api.Handlers;
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

            services.AddTransient<IEnumHelper, EnumHelper>();
            services.AddTransient<IFilesManager, FilesManager>();

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
                    .InNamespaces("ServiceDesk.Api.Builders.DtoBuilders")
                    .Where(type => type.Name.Contains("Builder")))
                .AsImplementedInterfaces()
                .WithTransientLifetime());

            services.Scan(scan => scan
                .FromApplicationDependencies()
                .AddClasses(classes => classes
                    .InNamespaces("ServiceDesk.Api.Handlers")
                    .Where(type => type.Name.EndsWith("Handler")))
                .AsImplementedInterfaces()
                .WithTransientLifetime());
        }
    }
}
