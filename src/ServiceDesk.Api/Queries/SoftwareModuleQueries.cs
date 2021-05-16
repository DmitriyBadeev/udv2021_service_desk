using System.Collections.Generic;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.SoftwareModule;
using ServiceDesk.Api.Systems.DirectorySystem.Dtos.SoftwareModule;
using ServiceDesk.Api.Systems.DirectorySystem.Handlers.SoftwareModule;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType(Name = "Queries")]
    public class SoftwareModuleQueries
    {
        private readonly ISoftwareModuleHandler softwareModuleHandler;

        public SoftwareModuleQueries(ISoftwareModuleHandler softwareModuleHandler)
        {
            this.softwareModuleHandler = softwareModuleHandler;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public SoftwareModuleDto GetSoftwareModule(int id, [Service] ServiceDeskDbContext context)
        {
            var softwareModule = softwareModuleHandler
                .Get<SoftwareModuleDtoBuilder, SoftwareModuleDto>(id, context);

            return softwareModule;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<SoftwareModuleDto> GetSoftwareModules([Service] ServiceDeskDbContext context)
        {
            var softwareModules = softwareModuleHandler
                .GetAll<SoftwareModuleDtoBuilder, SoftwareModuleDto>(context);

            return softwareModules;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<SoftwareModuleDto> PageSoftwareModules(int pageNumber, int count, [Service] ServiceDeskDbContext context)
        {
            var softwareModules = softwareModuleHandler
                .Page<SoftwareModuleDtoBuilder, SoftwareModuleDto>(pageNumber, count, context);

            return softwareModules;
        }
    }
}
