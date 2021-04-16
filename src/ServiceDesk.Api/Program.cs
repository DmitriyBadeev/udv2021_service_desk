using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ServiceDesk.Api.Services;

namespace ServiceDesk.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogInformation("Running application");
                try
                {
                    var seed = services.GetRequiredService<ISeedDataService>();
                    seed.Initialise();
                }
                catch (Exception ex)
                {
                    logger.LogCritical($"Error creating/seeding database - {ex.Message}", ex);
                }
            }
                
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .ConfigureLogging(builder => builder
                            .AddConsole()
                            .AddFile())
                        .UseStartup<Startup>();
                });
    }
}