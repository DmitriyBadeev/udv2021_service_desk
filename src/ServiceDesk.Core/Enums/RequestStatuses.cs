using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace ServiceDesk.Core.Enums
{
    public enum RequestStatuses
    {
        [Description("Новая")]
        New,

        [Description("Регистрация")]
        Registration,

        [Description("В работе")]
        InWork,

        [Description("Отменена")]
        Rejecting,

        [Description("Закрыта")]
        Closing,

        [Description("Переоткрыта")]
        Reopening
    }
}
