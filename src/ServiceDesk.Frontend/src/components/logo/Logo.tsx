import React from "react"
import styled from "styled-components"
import logo from "./logo.svg"

const LogoContainer = styled.div`
    width: 120px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 35px;
    }
`

const Logo: React.FC = () => {
    return (
        <LogoContainer>
            <img src={logo} alt="udv service desk logo" />
        </LogoContainer>
    )
}

export default Logo
