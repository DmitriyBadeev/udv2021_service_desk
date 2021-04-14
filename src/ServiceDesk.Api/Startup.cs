using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Interceptors;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ServiceDesk.Api.Queries;
using ServiceDesk.Api.Mutations;

namespace ServiceDesk.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddGraphQLServer()
                .AddAuthorization()
                .AddHttpRequestInterceptor(AuthenticationInterceptor())
                .AddQueryType(d => d.Name("Queries"))
                .AddType<TestQueries>()
                .AddType<ClientQueries>()
                .AddMutationType(d => d.Name("Mutations"))
                .AddType<TestMutations>()
                .AddType<ClientMutations>();
            
            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "https://identity-desk.badeev.info";
                    options.ApiName = "ServiceDesk.Api";
                });

            new DependencyInstaller(Configuration).Install(services);
        }
        
        private static HttpRequestInterceptorDelegate AuthenticationInterceptor()
        {
            return (context, executor, builder, ct) =>
            {
                var identity = context.GetUser().Identity;
                if (identity != null && identity.IsAuthenticated)
                {
                    builder.SetProperty("currentUserId",
                        context.User.FindFirstValue("sub"));
                }

                return default;
            };
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
            
            app.UseAuthentication();
            
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });
            app.UsePlayground("/graphql", "/playground");
        }
    }
}