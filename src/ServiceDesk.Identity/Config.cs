using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;

namespace ServiceDesk.Identity
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetApiResources(string api)
        {
            return new List<ApiResource>
            {
                new ApiResource(api)
            };
        }

        public static IEnumerable<Client> GetSpaClient(string clientId, List<string> redirects,
            string api)
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = clientId,
                    ClientName = "Udv Service desk",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret = false,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AccessTokenLifetime = 3600 * 5,
                    RequireConsent = false,
                    AllowedCorsOrigins = 
                    { 
                        "http://localhost:3000", 
                        "http://localhost:3001",
                        "http://u0911529.plsk.regruhosting.ru",
                        "https://desk.badeev.info"
                    },
                    PostLogoutRedirectUris = new List<string> 
                    {
                        "http://localhost:3000/signout",
                        "http://u0911529.plsk.regruhosting.ru/signout",
                        "https://desk.badeev.info/signout"
                    },
                    RedirectUris = redirects,
                    AllowedScopes = 
                    { 
                        IdentityServerConstants.StandardScopes.OpenId, 
                        IdentityServerConstants.StandardScopes.Profile,
                        api
                    }
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }
    }
}
