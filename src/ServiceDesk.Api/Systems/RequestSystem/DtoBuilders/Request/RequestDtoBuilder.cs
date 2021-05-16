using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Request;
using ServiceDesk.Core.Enums;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.EnumHelper;

namespace ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Request
{
    public class RequestDtoBuilder : IRequestDtoBuilder<RequestDto>
    {
        public RequestDto Build(Core.Entities.RequestSystem.Request entity)
        {
            var enumHelper = new EnumHelper();

            var requestStatus = enumHelper.GetEnumName(entity.RequestStatus);
            
            var requestDto = new RequestDto()
            {
                Id = entity.Id,
                AuthorId = entity.AuthorId,
                CreationDate = entity.CreationDate,
                DeveloperRepresentativeId = entity.DeveloperRepresentativeId,
                ProcessingDate = entity.ProcessingDate,
                Text = entity.Text,
                Theme = entity.Theme,
                Software = entity.SoftwareModule?.Software?.Title,
                SoftwareId = entity.SoftwareModule?.SoftwareId,
                SoftwareModule = entity.SoftwareModule?.Title,
                SoftwareModuleId = entity.SoftwareModuleId,
                RequestStatus = requestStatus,
                ClientId = entity.ClientId,
                ClientName = entity.Client.Name
            };

            return requestDto;
        }

        public List<RequestBoardDto> BuildRequestBoards(ServiceDeskDbContext context)
        {
            var enumHelper = new EnumHelper();

            var rs = Enum
                .GetValues(typeof(RequestStatuses))
                .Cast<RequestStatuses>();

            var requests = context.Requests
                .Include(x => x.SoftwareModule)
                .ThenInclude(x => x.Software)
                .Include(x => x.Client)
                .ToList();

            var boards = new List<RequestBoardDto>();

            foreach (var requestStatus in rs)
            {
                var name = enumHelper.GetEnumName(requestStatus);

                var items = requests
                    .Where(x => x.RequestStatus == requestStatus)
                    .AsEnumerable()
                    .Select(Build)
                    .ToList();

                boards.Add(new RequestBoardDto()
                {
                    Name = name,
                    Items = items
                });
            }

            return boards;
        }
    }
}
