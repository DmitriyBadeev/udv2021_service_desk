using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using ServiceDesk.Api.Dtos.Client;
using ServiceDesk.Infrastructure;
using ServiceDesk.Infrastructure.Implementations.Factories.PersonalAreaSystem;

namespace ServiceDesk.Api.Handlers.PersonalAreaSystem.Client
{
    public interface IClientHandler : IGenericHandler<Core.Entities.PersonalAreaSystem.Client>
    {

    }
}
