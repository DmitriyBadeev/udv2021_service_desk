using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceDesk.Infrastructure.EnumHelper
{
    public interface IEnumHelper
    {
        public string GetEnumName<TEnum>(TEnum enumerator)
            where TEnum : Enum;
    }
}
