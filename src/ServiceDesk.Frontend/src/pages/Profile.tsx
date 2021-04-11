import React from "react"
import useStore from "store/useStore"
// import useProfileData from "hooks/useProfileData"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import { Descriptions } from "antd"
import { getRoleDisplayName } from "helpers/roleHelper"
import { getNumericStringDate } from "helpers/dateHelpers"
import { observer } from "mobx-react"

const Profile: React.FC = observer(() => {
    const { authService } = useStore()
    //const { data, loading } = useProfileData()

    const user = authService.user

    const lastName = user?.profile.last_name
    const firstName = user?.profile.first_name
    const patronymic = user?.profile.patronymic
    const role = user?.profile.role
    const email = user?.profile.email
    const registerDate = user?.profile.register_date

    return (
        <FadePage>
            <Card>
                <CardHeader
                    title="Информация о пользователе"
                    buttonText="Редактировать"
                />

                <Descriptions column={2} labelStyle={{ fontWeight: 600 }}>
                    <Descriptions.Item label="Фамилия">
                        {lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Имя">
                        {firstName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Отчество">
                        {patronymic}
                    </Descriptions.Item>
                    <Descriptions.Item label="Эл. почта">
                        {email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Дата регистрации">
                        {getNumericStringDate(registerDate)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Роль">
                        {getRoleDisplayName(role)}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </FadePage>
    )
})

export default Profile
