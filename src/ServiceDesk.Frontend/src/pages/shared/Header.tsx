import React, { useEffect } from "react"
import styled from "styled-components"

import { useLocation } from "react-router-dom"
import useStore from "store/useStore"
import { useSecretLazyQuery } from "types"

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

    return <div>Header - {data?.userId}</div>
}

export default Header
