import React, { useEffect } from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { DEVELOPER_ROLE, OWNER_ROLE, CUSTOMER_ROLE } from "helpers/roleHelper"
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
    align-items: center;
`

const Header: React.FC = observer(() => {
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

    const exit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        authService.signout()
    }

    const user = authService.user

    const userId = user?.profile.user_id
    const lastName = user?.profile.last_name
    const firstName = user?.profile.first_name
    const patronymic = user?.profile.patronymic
    const role = user?.profile.role
    const costumerId = user?.profile.customer_id

    let fullName = "Loading..."

    if (lastName && firstName && patronymic) {
        fullName = `${lastName} ${firstName} ${patronymic}`
    }

    return (
        <HeaderContainer>
            <Flex>
                <Logo />
                <MenuContainer>{getMenu(role, location.pathname, costumerId)}</MenuContainer>
            </Flex>
            <Flex>
                <MenuContainer>
                    <MenuItem>
                        <MenuLink to={`/profile/${userId}`} $active={location.pathname.startsWith("/profile")}>
                            {fullName}
                        </MenuLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuLink to="/" onClick={exit} $active={false}>
                            Выход
                        </MenuLink>
                    </MenuItem>
                </MenuContainer>
            </Flex>
        </HeaderContainer>
    )
})

const getMenu = (role: string, location: string, costumerId: string) => {
    if (role === DEVELOPER_ROLE) return DeveloperMenu(location)

    if (role === CUSTOMER_ROLE || role === OWNER_ROLE) return CustomerMenu(location, costumerId)

    return "Loading..."
}

const MenuItem = styled.span`
    height: 100%;
    display: flex;
    align-items: center;

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

type linkTypes = {
    $active: boolean
}

const MenuLink = styled(Link)<linkTypes>`
    color: ${(props) => (props.$active ? props.theme.primary : props.theme.white)};
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
`

const DeveloperMenu = (location: string) => {
    return (
        <>
            <MenuItem>
                <MenuLink to="/" $active={location === "/"}>
                    Обращения
                </MenuLink>
            </MenuItem>
            <MenuItem>
                <MenuLink to="/cabinets" $active={location.startsWith("/cabinets")}>
                    Личные кабинеты
                </MenuLink>
            </MenuItem>
            <MenuItem>
                <MenuLink to="/" $active={false}>
                    Регистрация
                </MenuLink>
            </MenuItem>
        </>
    )
}

const CustomerMenu = (location: string, costumerId: string) => {
    return (
        <>
            <MenuItem>
                <MenuLink to="/customer-appeals" $active={location.startsWith("/customer-appeals")}>
                    Обращения
                </MenuLink>
            </MenuItem>
            <MenuItem>
                <MenuLink to={`/cabinets/${costumerId}`} $active={location.startsWith("/cabinets")}>
                    Личный кабинет
                </MenuLink>
            </MenuItem>
        </>
    )
}

export default Header
