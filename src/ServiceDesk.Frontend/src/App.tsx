import React, { useEffect } from "react"
import "./index.css"
import { ThemeProvider } from "styled-components"
import { ConfigProvider, Spin } from "antd"
import ru_RU from "antd/es/locale/ru_RU"
import { BrowserRouter } from "react-router-dom"
import Shared from "pages/shared/Shared"
import Routes from "Routes"
import { from, ApolloClient, InMemoryCache } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import { LoadingOutlined } from "@ant-design/icons"
import { BASE_GRAPHQL_API_URL } from "store/Config"
import { createUploadLink } from "apollo-upload-client"
import { setContext } from "apollo-link-context"

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 32 }} spin />)

const links = from([
    //@ts-ignore
    new createUploadLink({ uri: `${BASE_GRAPHQL_API_URL}/graphql?` }),
])

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token")
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(links),
    cache: new InMemoryCache(),
})

const theme = {
    primary: "#00D29D",
    black: "#302E2E",

    green: "#52C41A",
    red: "#FF4D4F",
    orange: "#FAAD14",
    white: "#FFFFFF",

    grey1: "#333333",
    grey2: "#4F4F4F",
    grey3: "#828282",
    grey4: "#BDBDBD",
    grey5: "#E0E0E0",
    grey6: "#F2F2F2",

    baseTransition: "0.3s",
    hoverColor: "#19e6b2",
    inputShadowFocus: "rgba(3, 214, 161, 0.3) 0px 0px 0px 2.8px",
    inputShadowColor: "rgba(58, 211, 173, 0.3)",
}

const App: React.FC = observer(() => {
    const { authService } = useStore()

    useEffect(() => {
        authService.loadUser()
    }, [authService])

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <ConfigProvider locale={ru_RU} csp={{ nonce: "udv_service_desk" }}>
                    <BrowserRouter>
                        <Shared>
                            <Routes />
                        </Shared>
                    </BrowserRouter>
                </ConfigProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
})

export default App
