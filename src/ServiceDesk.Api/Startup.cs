using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Hangfire;
using Hangfire.Dashboard;
using Hangfire.SqlServer;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Interceptors;
using HotChocolate.Execution;
using HotChocolate.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using ServiceDesk.Api.Queries;
using ServiceDesk.Api.Mutations;
using ServiceDesk.Api.Services;
using ServiceDesk.Api.Services.BackgroundTasks;
using ServiceDesk.Infrastructure;

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
                .AddType<UploadType>()
                .AddQueryType(d => d.Name("Queries"))
                .AddType<TestQueries>()
                .AddType<ClientQueries>()
                .AddType<RequestQueries>()
                .AddType<CommentQueries>()
                .AddType<RequestAttachmentQueries>()
                .AddType<LicenseQueries>()
                .AddType<SoftwareQueries>()
                .AddType<SoftwareModuleQueries>()
                .AddMutationType(d => d.Name("Mutations"))
                .AddType<TestMutations>()
                .AddType<ClientMutations>()
                .AddType<RequestMutations>()
                .AddType<CommentMutations>()
                .AddType<RequestAttachmentMutations>()
                .AddType<LicenseMutations>()
                .AddType<SoftwareMutations>()
                .AddType<SoftwareModuleMutations>();

            services.Configure<FormOptions>(options =>
            {
                // Set the limit to 256 MB
                options.MultipartBodyLengthLimit = 268435456;
            });

            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "https://identity-desk.badeev.info";
                    options.ApiName = "ServiceDesk.Api";
                });


            services.AddScoped<ISeedDataService, SeedService>();
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
            
            app.UseHangfireDashboard("/hangfire", new DashboardOptions()
            {
                IsReadOnlyFunc = context => true
            });
            app.UseHangfireServer();

            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
                endpoints.MapHangfireDashboard();
            });
            app.UseGraphQLAltair();

        }
    }
}