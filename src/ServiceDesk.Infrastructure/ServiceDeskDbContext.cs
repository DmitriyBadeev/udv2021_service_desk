using System.Runtime.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using ServiceDesk.Core.Entities.DirectorySystem;
using ServiceDesk.Core.Entities.PersonalAreaSystem;
using ServiceDesk.Core.Entities.RequestSystem;

namespace ServiceDesk.Infrastructure
{
    public class ServiceDeskDbContext : DbContext
    {
        public ServiceDeskDbContext(DbContextOptions options) : base(options)
        {
            //ChangeTracker = base.ChangeTracker;
            //Model = base.Model;
        }

        //[IgnoreDataMember]
        //public override ChangeTracker ChangeTracker { get; }

        //[IgnoreDataMember]
        //public override IModel Model { get; }

        public DbSet<License> Licenses { get; set; }
        public DbSet<Software> Softwares { get; set; }
        public DbSet<SoftwareModule> SoftwareModules { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestAttachment> RequestAttachments { get; set; }
    }
}