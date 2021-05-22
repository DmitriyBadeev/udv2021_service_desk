using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ServiceDesk.Core.Entities.RequestSystem;
using ServiceDesk.Core.Interfaces.Common;

namespace ServiceDesk.Api.Samples.Models
{
    public class Sample<TEntity>
        where TEntity : IEntity
    {
        private readonly Func<TEntity, bool> predicate;

        public Sample(Func<TEntity, bool> predicate)
        {
            this.predicate = predicate;
        }

        public Sample<TEntity> And(Sample<TEntity> secondSample)
        {
            Func<TEntity, bool> newSample = x => predicate(x) && secondSample.predicate(x);

            return new Sample<TEntity>(newSample);
        }

        public Expression<Func<TEntity, bool>> GetExpression()
        {
            return x => predicate(x);
        }
    }
}
