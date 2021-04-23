using System.Globalization;
using HotChocolate;

namespace ServiceDesk.Api.BackgroundTasks.ErrorFilter
{
    public class GraphQlErrorFilter : IErrorFilter
    {
        public IError OnError(IError error)
        {
            return error.WithMessage($"Ошибка: {error.Exception?.Message.ToString(new CultureInfo("ru-RU"))}");
        }
    }
}
