using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;

namespace ServiceDesk.Infrastructure.EnumHelper
{
    public class EnumHelper : IEnumHelper
    {
        public string GetEnumName<TEnum>(TEnum enumerator)
            where TEnum : Enum
        {
            var enumType = enumerator.GetType();

            var enumName = ((DescriptionAttribute)enumType
                .GetMembers()
                .FirstOrDefault(x => x.Name == enumerator.ToString())?
                .GetCustomAttributes()
                .FirstOrDefault(x => x is DescriptionAttribute))?.Description;

            return enumName;
        }
    }
}
