using System;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Interfaces.Common;
using ServiceDesk.Core.Interfaces.Factories.RequestSystem;

namespace ServiceDesk.Infrastructure.Implementations.Factories.RequestSystem
{
    public class CommentData : IFactoryData
    {
        public string Text { get; set; }
        public string AuthorId { get; set; }
    }

    public class CommentFactory : ICommentFactory<CommentData>
    {
        public Comment Create(CommentData data)
        {
            var comment = new Comment()
            {
                Text = data.Text,
                AuthorId = data.AuthorId,
                CreationDate = DateTime.Now
            };

            return comment;
        }
    }
}
