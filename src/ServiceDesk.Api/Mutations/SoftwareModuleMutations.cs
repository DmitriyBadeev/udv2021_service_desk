using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.SoftwareModule;
using ServiceDesk.Api.Systems.DirectorySystem.Dtos.SoftwareModule;
using ServiceDesk.Api.Systems.DirectorySystem.Handlers.SoftwareModule;
using ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Comment;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Comment;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.DirectorySystem;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;

namespace ServiceDesk.Api.Mutations
{
    [ExtendObjectType(Name = "Mutations")]
    public class SoftwareModuleMutations
    {
        private readonly ISoftwareModuleHandler softwareModuleHandler;

        public SoftwareModuleMutations(ISoftwareModuleHandler softwareModuleHandler)
        {
            this.softwareModuleHandler = softwareModuleHandler;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public SoftwareModuleDto CreateSoftwareModule(SoftwareModuleCreateDto softwareModuleCreateDto,
            [Service] ServiceDeskDbContext context)
        {
            var softwareModuleData = new SoftwareModuleData()
            {
                SoftwareId = softwareModuleCreateDto.SoftwareId,
                Title = softwareModuleCreateDto.Title
            };

            var softwareModule = softwareModuleHandler.Create<SoftwareModuleFactory,
                SoftwareModuleDtoBuilder,
                SoftwareModuleData,
                SoftwareModuleDto>(softwareModuleData, context);

            return softwareModule;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public SoftwareModuleDto EditSoftwareModule(int id, 
            SoftwareModuleCreateDto softwareModuleCreateDto, [Service] ServiceDeskDbContext context)
        {
            var softwareModule = softwareModuleHandler.Edit<SoftwareModuleDtoBuilder,
                SoftwareModuleDto,
                SoftwareModuleCreateDto>(id, softwareModuleCreateDto, context);

            return softwareModule;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string DeleteSoftwareModule(int id, [Service] ServiceDeskDbContext context)
        {
            bool isSuccess;
            softwareModuleHandler.Delete(id, context, out isSuccess);

            if (isSuccess)
            {
                return "Ok";
            }

            return "Error";
        }
    }
}
