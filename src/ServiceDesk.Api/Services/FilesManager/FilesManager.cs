using System;
using System.IO;
using System.Threading.Tasks;
using HotChocolate.Types;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using ServiceDesk.Api.Services.FilesManager.Models;

namespace ServiceDesk.Api.Services.FilesManager
{
    public class FilesManager : IFilesManager
    {
        private readonly string baseDirectoryPath;
        private readonly string directoryName = "Files";

        public FilesManager(IHostingEnvironment environment)
        {
            this.baseDirectoryPath = Path.Combine(environment.WebRootPath, directoryName);
        }

        public async Task<SavedFile> CreateFile(Guid requestId, IFile file)
        {
            var requestFolderPath = GetRequestFolderPath(requestId);

            var unicalFileName = $"{Guid.NewGuid()}_{file.Name}";

            var filePath = Path.Combine(requestFolderPath, unicalFileName);
            
            using (var stream = File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            return new SavedFile()
            {
                Path = filePath,
                RealName = file.Name,
                UnicalName = unicalFileName,
                SizeMb = GetFileSizeMB((long)file.Length).ToString(),
                Reference = $"{directoryName}/{requestId}/{unicalFileName}"
            };
        }

        private double GetFileSizeMB(long fileLength)
        {
            var sizeMb = Convert.ToDouble(fileLength) / 8 / 1024 / 1024;

            return sizeMb;
        }

        private string GetRequestFolderPath(Guid requestId)
        {
            var requestFolder = Path.Combine(baseDirectoryPath, requestId.ToString());

            if (!Directory.Exists(requestFolder))
            {
                Directory.CreateDirectory(requestFolder);
            }

            return requestFolder;
        }

        public void RemoveFile(Guid requestId, string unicalName)
        {
            var requestFolderPath = GetRequestFolderPath(requestId);

            var filePath = Path.Combine(requestFolderPath, unicalName);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }
}
