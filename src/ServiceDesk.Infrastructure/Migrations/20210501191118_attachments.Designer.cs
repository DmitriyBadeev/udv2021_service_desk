﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Infrastructure.Migrations
{
    [DbContext(typeof(ServiceDeskDbContext))]
    [Migration("20210501191118_attachments")]
    partial class attachments
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ServiceDesk.Core.Entities.DirectorySystem.License", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClientId")
                        .HasColumnType("int");

                    b.Property<int>("CountOfUsers")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExpiresDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("SoftwareId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("SoftwareId");

                    b.ToTable("Licenses");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.DirectorySystem.Software", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Softwares");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.DirectorySystem.SoftwareModule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("SoftwareId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("SoftwareId");

                    b.ToTable("SoftwareModules");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.PersonalAreaSystem.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("LockDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.RequestSystem.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AuthorId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("RequestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RequestId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.RequestSystem.Request", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AuthorId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ClientId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("DeveloperRepresentativeId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ProcessingDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("RequestStatus")
                        .HasColumnType("int");

                    b.Property<int?>("SoftwareModuleId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Theme")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("SoftwareModuleId");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.RequestSystem.RequestAttachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RealName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reference")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RequestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("SizeMb")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UnicalName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RequestId");

                    b.ToTable("RequestAttachments");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.DirectorySystem.License", b =>
                {
                    b.HasOne("ServiceDesk.Core.Entities.PersonalAreaSystem.Client", "Client")
                        .WithMany("Licenses")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ServiceDesk.Core.Entities.DirectorySystem.Software", "Software")
                        .WithMany()
                        .HasForeignKey("SoftwareId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Software");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.DirectorySystem.SoftwareModule", b =>
                {
                    b.HasOne("ServiceDesk.Core.Entities.DirectorySystem.Software", "Software")
                        .WithMany("SoftwareModules")
                        .HasForeignKey("SoftwareId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Software");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.RequestSystem.Comment", b =>
                {
                    b.HasOne("ServiceDesk.Core.Entities.RequestSystem.Request", "Request")
                        .WithMany("Comments")
                        .HasForeignKey("RequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Request");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.RequestSystem.Request", b =>
                {
                    b.HasOne("ServiceDesk.Core.Entities.PersonalAreaSystem.Client", "Client")
                        .WithMany("Requests")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ServiceDesk.Core.Entities.DirectorySystem.SoftwareModule", "SoftwareModule")
                        .WithMany()
                        .HasForeignKey("SoftwareModuleId");

                    b.Navigation("Client");

                    b.Navigation("SoftwareModule");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.RequestSystem.RequestAttachment", b =>
                {
                    b.HasOne("ServiceDesk.Core.Entities.RequestSystem.Request", "Request")
                        .WithMany("RequestAttachments")
                        .HasForeignKey("RequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Request");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.DirectorySystem.Software", b =>
                {
                    b.Navigation("SoftwareModules");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.PersonalAreaSystem.Client", b =>
                {
                    b.Navigation("Licenses");

                    b.Navigation("Requests");
                });

            modelBuilder.Entity("ServiceDesk.Core.Entities.RequestSystem.Request", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("RequestAttachments");
                });
#pragma warning restore 612, 618
        }
    }
}
