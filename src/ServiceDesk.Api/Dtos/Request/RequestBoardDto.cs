using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceDesk.Api.Dtos.Request
{
    public class RequestBoardDto : IDto
    {
        public string Name { get; set; }
        public List<RequestDto> Items { get; set; }
    }
}
