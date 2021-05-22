using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using ServiceDesk.Api.Samples.Models;
using ServiceDesk.Core.Entities.RequestSystem;

namespace ServiceDesk.Api.Samples
{
    public static class RequestSamples
    {
        public static Sample<Request> BySoftware(int? softwareId)
        {
            return softwareId != null 
                ? new Sample<Request>(x => x.SoftwareModule.SoftwareId == softwareId)
                : new Sample<Request>(x => true);
        }

        public static Sample<Request> ByAuthor(string authorId)
        {
            return !string.IsNullOrEmpty(authorId)
                ? new Sample<Request>(x => x.AuthorId == authorId)
                : new Sample<Request>(x => true);
        }

        public static Sample<Request> ByDeveloperRepresentative(string userId)
        {
            return !string.IsNullOrEmpty(userId)
                ? new Sample<Request>(x => x.DeveloperRepresentativeId == userId)
                : new Sample<Request>(x => true);
        }
    }
}
