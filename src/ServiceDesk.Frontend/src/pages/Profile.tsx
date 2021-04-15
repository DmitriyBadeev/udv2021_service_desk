import React from "react"
import useProfileData from "hooks/useProfileData"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import { Descriptions, Space } from "antd"
import { getRoleDisplayName } from "helpers/roleHelper"
import { getNumericStringDate } from "helpers/dateHelpers"
import { useParams } from "react-router-dom"
import Loading from "components/loading/Loading"
import EditProfile from "components/forms/EditProfile"
import ChangePassword from "components/forms/ChangePassword"

type paramsTypes = {
    userId: string
}

//8af1ddba-4170-4b3e-a5fe-3994e1d2f475      -   CUSTOMER
//1def4892-489a-4309-beae-fde966ab47e9      -   DEVELOPER

const Profile: React.FC = () => {
    const { userId } = useParams<paramsTypes>()
    const { data, loading, reload } = useProfileData(userId)

    if (loading) return <Loading />

    const lastName = data?.lastName
    const firstName = data?.firstName
    const patronymic = data?.patronymic
    const role = data?.role
    const email = data?.email
    const registerDate = data?.registerDate
    const isBanned = data?.isBanned
    const profileUserId = data?.userId

    return (
        <FadePage>
            <Card>
                <CardHeader
                    title="Информация о пользователе"
                    Form={() => (
                        <EditProfile
                            buttonSize="large"
                            name={firstName}
                            lastName={lastName}
                            patronymic={patronymic}
                            email={email}
                            userId={profileUserId}
                            reload={reload}
                        />
                    )}
                />

                <Descriptions column={2} labelStyle={{ fontWeight: 600 }}>
                    <Descriptions.Item label="Идентификатор">{profileUserId}</Descriptions.Item>
                    <Descriptions.Item label="Фамилия">{lastName}</Descriptions.Item>
                    <Descriptions.Item label="Имя">{firstName}</Descriptions.Item>
                    <Descriptions.Item label="Отчество">{patronymic}</Descriptions.Item>
                    <Descriptions.Item label="Эл. почта">{email}</Descriptions.Item>
                    <Descriptions.Item label="Дата регистрации">{getNumericStringDate(registerDate)}</Descriptions.Item>

                    <Descriptions.Item label="Роль">{getRoleDisplayName(role)}</Descriptions.Item>
                    <Descriptions.Item label="Статус">{isBanned ? "Заблокирован" : "Активирован"}</Descriptions.Item>
                    <Descriptions.Item label="Пароль">
                        <Space>
                            **** <ChangePassword userId={profileUserId} />
                        </Space>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </FadePage>
    )
}

export default Profile
