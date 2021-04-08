import { UserManagerSettings, WebStorageStateStore } from "oidc-client"

export const prodConfig: UserManagerSettings = {
    authority: "http://identity.u0911529.plsk.regruhosting.ru",
    client_id: "service_desk_udv",
    redirect_uri: "http://u0911529.plsk.regruhosting.ru/auth-complete",
    response_type: "code",
    loadUserInfo: true,
    scope: "openid profile ServiceDesk.Api",
    post_logout_redirect_uri: "http://u0911529.plsk.regruhosting.ru/signout",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
    silent_redirect_uri: "http://u0911529.plsk.regruhosting.ru/silent.html",
}

export const devConfig: UserManagerSettings = {
    authority: "http://identity.u0911529.plsk.regruhosting.ru",
    client_id: "service_desk_udv",
    redirect_uri: "http://localhost:3000/auth-complete",
    response_type: "code",
    loadUserInfo: true,
    scope: "openid profile ServiceDesk.Api",
    post_logout_redirect_uri: "http://localhost:3000/signout",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
    silent_redirect_uri: "http://localhost:3000/silent.html",
}
