import React from "react"
import { SmallText, Text, TextProps } from "GeneralStyles"
import useUserName from "hooks/useUserName"

type propTypes = {
    userId: string
    type?: "default" | "small"
}

type allProps = TextProps & propTypes

const UserName: React.FC<allProps> = ({ userId, type = "default", ...textProps }) => {
    const { data, loading } = useUserName(userId)
    const lastName = data?.lastName
    const firstName = data?.firstName
    const patronymic = data?.patronymic

    let userName = ""
    if (lastName && firstName && patronymic) userName = `${lastName} ${firstName} ${patronymic}`

    if (type === "default") return <Text {...textProps}>{loading ? "Loading..." : userName}</Text>

    return <SmallText {...textProps}>{loading ? "Loading..." : userName}</SmallText>
}

export default UserName
