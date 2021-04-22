using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos;
using ServiceDesk.Api.Dtos.Request;
using ServiceDesk.Core.Enums;
using ServiceDesk.Infrastructure;

namespace ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Request
{
    public interface IRequestDtoBuilder<TDto> : IDtoBuilder<Core.Entities.RequestSystem.Request, TDto>
        where TDto : class, IDto
    {
        public List<RequestBoardDto> BuildRequestBoards(ServiceDeskDbContext context);
    }
}
