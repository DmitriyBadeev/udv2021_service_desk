import React from "react"
import styled from "styled-components"
import Header from "./Header"

const MainLayout = styled.div`
    background: ${(props) => props.theme.mainBackground};
    min-height: 100vh;
`

const ContentPage = styled.div`
    padding: 80px 60px 60px 60px;
    background: ${(props) => props.theme.grey6};
    min-height: 100vh;
`

const Shared: React.FC = (props) => {
    return (
        <MainLayout>
            <Header />
            <ContentPage>{props.children}</ContentPage>
        </MainLayout>
    )
}

export default Shared
