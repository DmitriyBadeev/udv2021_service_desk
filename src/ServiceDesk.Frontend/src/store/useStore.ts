import React from "react"
import AuthService from "./AuthService"

const StoreContext = React.createContext({
    authService: new AuthService(),
})

const useStore = () => React.useContext(StoreContext)

export default useStore
