import React, { useEffect } from "react"
import styled from "styled-components"

import { Link, useLocation } from "react-router-dom"
import useStore from "store/useStore"
import { useSecretLazyQuery } from "types"
import Logo from "components/logo/Logo"
import { Flex } from "GeneralStyles"

const HeaderContainer = styled.div`
    display: flex;
    height: 60px;
    position: absolute;
    background: ${(props) => props.theme.black};
    color: ${(props) => props.theme.white};
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 0 60px;
    justify-content: space-between;
`

const MenuContainer = styled.div`
    margin-left: 40px;
    height: 60px;
    display: flex;
`

const Header: React.FC = () => {
    const location = useLocation()
    const { authService } = useStore()

    const [query, { data, error }] = useSecretLazyQuery({
        fetchPolicy: "no-cache",
    })

    useEffect(() => {
        const timerId = setInterval(() => {
            query()
        }, 15000)

        return () => clearInterval(timerId)
    }, [query])

    useEffect(() => {
        const graphQlCodeError = error?.graphQLErrors[0]?.extensions?.code

        if (graphQlCodeError === "AUTH_NOT_AUTHORIZED") {
            authService.signin()
        }
    }, [data, query, error, authService])

    return (
        <HeaderContainer>
            <Flex>
                <Logo />
                <MenuContainer>{getMenu()}</MenuContainer>
            </Flex>
            <Flex>
                <MenuContainer>
                    <MenuItem>
                        <MenuLink to="/profile">ФИО пользователя</MenuLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuLink to="/">Выход</MenuLink>
                    </MenuItem>
                </MenuContainer>
            </Flex>
        </HeaderContainer>
    )
}

const getMenu = () => {
    return <DeveloperMenu />
}

const MenuItem = styled.span`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: ${(props) => props.theme.white};
    position: relative;
    transition: all ${(props) => props.theme.baseTransition};

    &::after {
        content: "";
        height: 15px;
        width: 1px;
        background: ${(props) => props.theme.grey2};
        right: 0;
        position: absolute;
    }

    &:last-child {
        &::after {
            opacity: 0;
        }
    }

    &:hover {
        background: ${(props) => props.theme.grey1};
    }
`

const MenuLink = styled(Link)`
    color: ${(props) => props.theme.white};
    height: 100%;
    display: flex;
    align-items: center;
`

const DeveloperMenu = () => {
    return (
        <>
            <MenuItem>
                <MenuLink to="/">Обращения</MenuLink>
            </MenuItem>
            <MenuItem>
                <MenuLink to="/cabinets">Личные кабинеты</MenuLink>
            </MenuItem>
            <MenuItem>
                <MenuLink to="/">Регистрация</MenuLink>
            </MenuItem>
        </>
    )
}

const CustomerMenu = () => {
    return <></>
}

export default Header
