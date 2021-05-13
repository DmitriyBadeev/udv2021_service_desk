using System.Collections.Generic;
using ServiceDesk.Api.Systems.Common.Interfaces.Dto;
using ServiceDesk.Api.Systems.Common.Interfaces.DtoBuilder;
using ServiceDesk.Api.Systems.RequestSystem.Dtos.Request;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Systems.RequestSystem.DtoBuilders.Request
{
    public interface IRequestDtoBuilder<TDto> : IDtoBuilder<Core.Entities.RequestSystem.Request, TDto>
        where TDto : class, IDto
    {
        public List<RequestBoardDto> BuildRequestBoards(ServiceDeskDbContext context);
    }
}
