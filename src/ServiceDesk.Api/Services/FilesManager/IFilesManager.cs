using System;
using System.Threading.Tasks;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using ServiceDesk.Api.Services.FilesManager.Models;

namespace ServiceDesk.Api.Services.FilesManager
{
    public interface IFilesManager
    {
        public Task<SavedFile> CreateFile(Guid requestId, IFile file);
        public void RemoveFile(Guid requestId, string unicalName);
    }
}
