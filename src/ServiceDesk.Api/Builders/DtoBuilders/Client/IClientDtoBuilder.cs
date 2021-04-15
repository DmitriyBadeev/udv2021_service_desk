using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceDesk.Api.Dtos.Client;

namespace ServiceDesk.Api.Builders.DtoBuilders.Client
{
    public interface IClientDtoBuilder
    {
        public ClientDto Build(Core.Entities.PersonalAreaSystem.Client client);
        public ClientListDto BuildListItem(Core.Entities.PersonalAreaSystem.Client client);
    }
}
