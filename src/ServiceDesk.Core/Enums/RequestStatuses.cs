using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace ServiceDesk.Core.Enums
{
    public enum RequestStatuses
    {
        [Description("Новые")]
        New,

        [Description("Зарегистрированные")]
        Registration,

        [Description("В работе")]
        InWork,

        [Description("Отклоненные")]
        Rejecting,

        [Description("Закрытые")]
        Closing,

        [Description("Переоткрытые")]
        Reopening
    }
}
