﻿using System;
using System.Collections.Generic;
using System.Text;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Core.Entities.DirectorySystem
{
    public class SoftwareModule : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public int SoftwareId { get; set; }
        public Software Software { get; set; }
    }
}