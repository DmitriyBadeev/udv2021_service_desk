import { UserManagerSettings, WebStorageStateStore } from "oidc-client"

export const prodConfig: UserManagerSettings = {
    authority: "https://identity-desk.badeev.info/",
    client_id: "service_desk_udv",
    redirect_uri: "https://desk.badeev.info/auth-complete",
    response_type: "code",
    loadUserInfo: true,
    scope: "openid profile ServiceDesk.Api",
    post_logout_redirect_uri: "https://desk.badeev.info/signout",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
    silent_redirect_uri: "https://desk.badeev.info/silent.html",
}

export const devConfig: UserManagerSettings = {
    authority: "https://identity-desk.badeev.info/",
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
