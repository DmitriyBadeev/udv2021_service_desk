using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiceDesk.Api.Handlers;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Infrastructure;

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
            services.AddDbContext<ServiceDeskDbContext>(x => 
                x.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

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
