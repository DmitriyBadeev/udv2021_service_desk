using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos;

namespace ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.Comment
{
    public interface ICommentDtoBuilder<TDto> : IDtoBuilder<Core.Entities.RequestSystem.Comment, TDto>
        where TDto : class, IDto
    {

    }
}
