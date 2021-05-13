using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using ServiceDesk.Api.Systems.DirectorySystem.DtoBuilders.Software;
using ServiceDesk.Api.Systems.DirectorySystem.Dtos.Software;
using ServiceDesk.Api.Systems.DirectorySystem.Handlers.Software;
using ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Comment;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Comment;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.DirectorySystem;
using ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem;

namespace ServiceDesk.Api.Mutations
{
    [ExtendObjectType(Name = "Mutations")]
    public class SoftwareMutations
    {
        private readonly ISoftwareHandler softwareHandler;

        public SoftwareMutations(ISoftwareHandler softwareHandler)
        {
            this.softwareHandler = softwareHandler;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public SoftwareDto CreateSoftware(SoftwareCreateDto softwareCreateDto,
            [Service] ServiceDeskDbContext context)
        {
            var softwareData = new SoftwareData()
            {
                Title = softwareCreateDto.Title
            };

            var software = softwareHandler.Create<SoftwareFactory,
                SoftwareDtoBuilder,
                SoftwareData,
                SoftwareDto>(softwareData, context);

            return software;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public SoftwareDto EditSoftware(int id, 
            SoftwareCreateDto softwareCreateDto, [Service] ServiceDeskDbContext context)
        {
            var software = softwareHandler.Edit<SoftwareDtoBuilder,
                SoftwareDto,
                SoftwareCreateDto>(id, softwareCreateDto, context);

            return software;
        }

        [Authorize(Roles = new[] { Constants.DEVELOPER_ROLE })]
        public string DeleteSoftware(int id, [Service] ServiceDeskDbContext context)
        {
            bool isSuccess;
            softwareHandler.Delete(id, context, out isSuccess);

            if (isSuccess)
            {
                return "Ok";
            }

            return "Error";
        }
    }
}
