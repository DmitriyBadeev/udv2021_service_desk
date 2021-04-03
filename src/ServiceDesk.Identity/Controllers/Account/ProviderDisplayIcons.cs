using System.Collections.Generic;

namespace ServiceDesk.Identity.Controllers.Account
{
    public static class ProviderDisplayIcons
    {
        public static Dictionary<string, string> Icons => new Dictionary<string, string>()
        {
            {
                "Google",
                "/google.webp"
            }
        };
    }
}