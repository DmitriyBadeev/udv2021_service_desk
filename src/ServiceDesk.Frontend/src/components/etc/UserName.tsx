import React from "react"
import { SmallText } from "GeneralStyles"
import useProfileData from "hooks/useProfileData"

type propTypes = {
    userId: string
}

const UserName: React.FC<propTypes> = ({ userId }) => {
    const { data, loading } = useProfileData(userId)
    const lastName = data?.lastName
    const firstName = data?.firstName
    const patronymic = data?.patronymic

    const userName = `${lastName} ${firstName} ${patronymic}`

    return <SmallText $color="grey2">{loading ? "Loading..." : userName}</SmallText>
}

export default UserName
