import React, { useEffect } from "react"
import { useLocation, Switch, Route, RouteProps, Redirect } from "react-router-dom"

import { observer } from "mobx-react"
import useStore from "store/useStore"
import Loading from "components/loading/Loading"
import Enter from "pages/auth/Enter"
import AuthComplete from "pages/auth/AuthComplete"
import Signout from "pages/auth/Signout"

import ServiceDesk from "pages/ServiceDesk"
import Cabinets from "pages/Cabinets"
import Cabinet from "pages/Cabinet"
import Profile from "pages/Profile"
import CustomerAppeals from "pages/CustomerAppeals"
import Appeal from "pages/Appeal"
import Users from "pages/Users"

import { DEVELOPER_ROLE } from "helpers/roleHelper"

const Routes: React.FC = () => {
    return (
        <ScrollToTop>
            <Switch>
                <PrivateRoute exact path="/">
                    <DeveloperRoute>
                        <ServiceDesk />
                    </DeveloperRoute>
                </PrivateRoute>
                <PrivateRoute exact path="/cabinets">
                    <DeveloperRoute>
                        <Cabinets />
                    </DeveloperRoute>
                </PrivateRoute>
                <PrivateRoute exact path="/cabinets/:id">
                    <Cabinet />
                </PrivateRoute>
                <PrivateRoute exact path="/profile/:userId">
                    <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/customer-appeals">
                    <CustomerAppeals />
                </PrivateRoute>
                <PrivateRoute exact path="/appeals/:id">
                    <Appeal />
                </PrivateRoute>
                <PrivateRoute exact path="/users">
                    <Users />
                </PrivateRoute>
                <Route exact path="/enter">
                    <Enter />
                </Route>
                <Route exact path="/auth-complete">
                    <AuthComplete />
                </Route>
                <Route exact path="/signout">
                    <Signout />
                </Route>
            </Switch>
        </ScrollToTop>
    )
}

export default Routes

const ScrollToTop: React.FC = (props) => {
    let location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return <>{props.children}</>
}

const PrivateRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
    const { authService } = useStore()

    if (authService.isLoadingUser) {
        return <Loading height="70vh" size="big" />
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authService.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/enter",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
})

const DeveloperRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
    const { authService } = useStore()

    if (authService.isLoadingUser) {
        return <Loading height="70vh" size="big" />
    }

    const userRole = authService.user?.profile.role

    return (
        <Route
            {...rest}
            render={({ location }) =>
                userRole === DEVELOPER_ROLE ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/customer-appeals",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
})
