using System.Collections.Generic;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.Software;
using ServiceDesk.Api.Systems.DirectorySystem.Dtos.Software;
using ServiceDesk.Api.Systems.DirectorySystem.Handlers.Software;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Queries
{
    [ExtendObjectType(Name = "Queries")]
    public class SoftwareQueries
    {
        private readonly ISoftwareHandler softwareHandler;

        public SoftwareQueries(ISoftwareHandler softwareHandler)
        {
            this.softwareHandler = softwareHandler;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public SoftwareDto GetSoftware(int id, [Service] ServiceDeskDbContext context)
        {
            var software = softwareHandler
                .Get<SoftwareDtoBuilder, SoftwareDto>(id, context);

            return software;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<SoftwareDto> GetSoftwares([Service] ServiceDeskDbContext context)
        {
            var softwares = softwareHandler
                .GetAll<SoftwareDtoBuilder, SoftwareDto>(context);

            return softwares;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE, Constants.OWNER_ROLE, Constants.CUSTOMER_ROLE })]
        public IEnumerable<SoftwareDto> PageSoftwares(int pageNumber, int count, [Service] ServiceDeskDbContext context)
        {
            var softwares = softwareHandler
                .Page<SoftwareDtoBuilder, SoftwareDto>(pageNumber, count, context);

            return softwares;
        }
    }
}
