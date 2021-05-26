import React from "react"
import useProfileData from "hooks/useProfileData"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import { Descriptions, Result, Space } from "antd"
import { getRoleDisplayName } from "helpers/roleHelper"
import { getNumericStringDate } from "helpers/dateHelpers"
import { useParams } from "react-router-dom"
import Loading from "components/loading/Loading"
import EditProfile from "components/forms/EditProfile"
import ChangePassword from "components/forms/ChangePassword"

type paramsTypes = {
    userId: string
}

const Profile: React.FC = () => {
    const { userId } = useParams<paramsTypes>()
    const { data, loading, error, reload } = useProfileData(userId)

    if (loading) return <Loading height="70vh" size="big" />

    if (error) {
        if (error.response.status === 404) {
            return <Result status="404" title="404" subTitle="Такого пользователя не существует" />
        }
    }

    const lastName = data?.lastName
    const firstName = data?.firstName
    const patronymic = data?.patronymic
    const role = data?.role
    const email = data?.email
    const registerDate = data?.registerDate
    const isBanned = data?.isBanned
    const profileUserId = data?.userId
    const canEdit = data?.canEdit || false

    const FIO = `${lastName} ${firstName} ${patronymic}`

    return (
        <FadePage>
            <Card>
                <CardHeader
                    title="Информация о пользователе"
                    Form={() =>
                        canEdit && (
                            <EditProfile
                                buttonSize="large"
                                name={firstName}
                                lastName={lastName}
                                patronymic={patronymic}
                                email={email}
                                userId={profileUserId}
                                reload={reload}
                            />
                        )
                    }
                />

                <Descriptions column={2} labelStyle={{ fontWeight: 600 }}>
                    <Descriptions.Item label="Идентификатор">{profileUserId}</Descriptions.Item>
                    <Descriptions.Item label="ФИО">{FIO}</Descriptions.Item>

                    <Descriptions.Item label="Эл. почта">{email}</Descriptions.Item>
                    <Descriptions.Item label="Дата регистрации">{getNumericStringDate(registerDate)}</Descriptions.Item>

                    <Descriptions.Item label="Роль">{getRoleDisplayName(role)}</Descriptions.Item>
                    <Descriptions.Item label="Статус">{isBanned ? "Заблокирован" : "Активирован"}</Descriptions.Item>
                    <Descriptions.Item label="Пароль">
                        <Space>**** {canEdit && <ChangePassword userId={profileUserId} />}</Space>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </FadePage>
    )
}

export default Profile
