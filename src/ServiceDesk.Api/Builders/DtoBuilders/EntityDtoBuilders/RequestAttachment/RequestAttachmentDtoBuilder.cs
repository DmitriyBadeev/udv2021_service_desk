using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Dtos.RequestAttachment;

namespace ServiceDesk.Api.Builders.DtoBuilders.EntityDtoBuilders.RequestAttachment
{
    public class RequestAttachmentDtoBuilder : IRequestAttachmentDtoBuilder<RequestAttachmentDto>
    {
        public RequestAttachmentDto Build(Core.Entities.RequestSystem.RequestAttachment entity)
        {
            var requestAttachmentDto = new RequestAttachmentDto()
            {
                Id = entity.Id,
                Name = entity.RealName,
                SizeMb = entity.SizeMb,
                Reference = entity.Reference
            };

            return requestAttachmentDto;
        }
    }
}
