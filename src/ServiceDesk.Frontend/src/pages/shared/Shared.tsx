import React from "react"
import styled from "styled-components"
import Header from "./Header"

const MainLayout = styled.div`
    width: 100%;
`

const ContentPage = styled.div`
    padding: 100px 40px 10px 40px;
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
