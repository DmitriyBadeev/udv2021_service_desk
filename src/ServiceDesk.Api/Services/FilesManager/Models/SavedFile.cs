using System;

namespace ServiceDesk.Api.Services.FilesManager.Models
{
    public class SavedFile
    {
        public string Path { get; set; }
        public string RealName { get; set; }
        public string UnicalName { get; set; }
        public string SizeMb { get; set; }
        public string Reference { get; set; }
    }
}
