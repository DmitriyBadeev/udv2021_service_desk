using System;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Enums;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.RequestSystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem
{
    public class RequestData : IFactoryData
    {
        public string Theme { get; set; }
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public int? SoftwareModuleId { get; set; }
        public int ClientId { get; set; }
    }

    public class RequestFactory : IRequestFactory<RequestData>
    {
        public Request Create(RequestData data)
        {
            var request = new Request()
            {
                Theme = data.Theme,
                Text = data.Text,
                AuthorId = data.AuthorId,
                SoftwareModuleId = data.SoftwareModuleId,
                CreationDate = DateTime.Now,
                RequestStatus = RequestStatuses.New,
                ClientId = data.ClientId
            };

            return request;
        }
    }
}
