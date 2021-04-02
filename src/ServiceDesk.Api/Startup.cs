using HotChocolate.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ServiceDesk.Api.Queries;
using ServiceDesk.Api.Mutations;

namespace ServiceDesk.Api
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            
            services.AddGraphQLServer()
                .AddAuthorization()
                .AddQueryType(d => d.Name("Queries"))
                .AddType<TestQueries>()
                .AddMutationType(d => d.Name("Mutations"))
                .AddType<TestMutations>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseCors(b => b
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });
            app.UsePlayground("/graphql", "/playground");
        }
    }
}