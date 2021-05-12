using System.Collections.Generic;
using ServiceDesk.Api.Systems.Common.Interfaces.Dto;

namespace ServiceDesk.Api.Systems.RequestSystem.Dtos.Request
{
    public class RequestBoardDto : IDto
    {
        public string Name { get; set; }
        public List<RequestDto> Items { get; set; }
    }
}
