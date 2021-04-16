import { Button, Descriptions, Table, message } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import Loading from "components/loading/Loading"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { useGetClientQuery } from "types"
import { getNumericStringDate } from "helpers/dateHelpers"
import EditCustomer from "components/forms/EditCustomer"
import useCustomerUsersData from "hooks/useCustomerUsersData"
import { getRoleDisplayName } from "helpers/roleHelper"
import { Text } from "GeneralStyles"
import EditProfile from "components/forms/EditProfile"
import AddUserCustomer from "components/forms/AddUserCustomer"
import { observer } from "mobx-react"
import { DEVELOPER_ROLE, OWNER_ROLE } from "helpers/roleHelper"
import useStore from "store/useStore"

type paramsTypes = {
    id: string
}

const Cabinet: React.FC = observer(() => {
    const { id: stringId } = useParams<paramsTypes>()
    const id = Number.parseInt(stringId)
    const { data, loading, error, refetch } = useGetClientQuery({ variables: { id } })

    const { data: users, loading: usersLoading, reload: reloadUsers } = useCustomerUsersData(id)
    const { authService } = useStore()

    const userRole = authService.user?.profile.role
    const canEditCustomer = userRole === OWNER_ROLE || userRole === DEVELOPER_ROLE
    const canCreateCustomer = userRole === OWNER_ROLE || userRole === DEVELOPER_ROLE

    if (loading) return <Loading />
    if (error) message.error(error.message)

    const customerData = data?.client

    const columns = [
        {
            title: "ФИО",
            key: "name",
            render: (_items: any, item: any) => {
                return (
                    <Link
                        to={`/profile/${item.userId}`}
                    >{`${item.lastName} ${item.firstName} ${item.patronymic}`}</Link>
                )
            },
        },
        {
            title: "Эл. почта",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Роль",
            key: "role",
            render: (_items: any, item: any) => {
                return <Text>{getRoleDisplayName(item.role)}</Text>
            },
        },
        {
            title: "Активность",
            key: "isActive",
            render: (_items: any, item: any) => {
                return <Text>{item.isBanned ? "Заблокирован" : "Активирован"}</Text>
            },
        },
        {
            title: "Дата создания",
            key: "registerDate",
            render: (_items: any, item: any) => {
                return <Text>{getNumericStringDate(item.registerDate)}</Text>
            },
        },

        {
            title: "Действия",
            key: "actions",
            colSpan: 2,
            width: 150,
            render: (_items: any, item: any) => {
                if (item.canEdit)
                    return (
                        <EditProfile
                            buttonSize="middle"
                            buttonType="link"
                            name={item.firstName}
                            lastName={item.lastName}
                            patronymic={item.patronymic}
                            email={item.email}
                            userId={item.userId}
                            reload={reloadUsers}
                        />
                    )
            },
        },
        {
            key: "actions2",
            colSpan: 0,
            width: 100,
            render: (_items: any, item: any) => {
                return (
                    <Button type="link" danger>
                        Удалить
                    </Button>
                )
            },
        },
    ]

    return (
        <FadePage>
            <Card>
                <CardHeader
                    title={customerData?.name || ""}
                    Form={() =>
                        canEditCustomer ? (
                            <EditCustomer
                                type="primary"
                                buttonSize="large"
                                id={id}
                                name={customerData?.name || ""}
                                reload={() => refetch()}
                            />
                        ) : null
                    }
                />

                <Descriptions column={2} labelStyle={{ fontWeight: 600 }}>
                    <Descriptions.Item label="Идентификатор">{customerData?.id}</Descriptions.Item>
                    <Descriptions.Item label="Статус">
                        {customerData?.isActive ? "Активен" : "Заблокирован"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Дата создания">
                        {getNumericStringDate(customerData?.creationDate)}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="Дата блокировки">
                        {getNumericStringDate(customerData?.lockDate)}
                    </Descriptions.Item> */}
                </Descriptions>
            </Card>

            <Card isSecondary>
                <CardHeader
                    title="Представители заказчика"
                    Form={() =>
                        canCreateCustomer ? <AddUserCustomer customerId={id} reload={() => reloadUsers()} /> : null
                    }
                    size="small"
                />

                <Table size="middle" loading={usersLoading} dataSource={users} columns={columns} />
            </Card>
        </FadePage>
    )
})

export default Cabinet
