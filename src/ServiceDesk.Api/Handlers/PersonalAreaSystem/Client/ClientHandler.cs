using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using ServiceDesk.Api.Builders.DtoBuilders.Client;
using ServiceDesk.Api.Builders.DtoBuilders.Interfaces;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Core.Interfaces.Factories.PersonalAreaSystem;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;

namespace ServiceDesk.Api.Handlers.PersonalAreaSystem.Client
{
    public class ClientHandler : GenericHandler<Core.Entities.PersonalAreaSystem.Client>, IClientHandler
    {
        
    }
}
