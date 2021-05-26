import { Button, Descriptions, Table, message, Popconfirm, Tooltip } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import Loading from "components/loading/Loading"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { useGetClientQuery } from "types"
import { getNumericStringDate } from "helpers/dateHelpers"
import EditCustomer from "components/forms/EditCustomer"
import { getRoleDisplayName } from "helpers/roleHelper"
import { Text } from "GeneralStyles"
import EditProfile from "components/forms/EditProfile"
import AddUserCustomer from "components/forms/AddUserCustomer"
import { observer } from "mobx-react"
import { DEVELOPER_ROLE, OWNER_ROLE } from "helpers/roleHelper"
import useStore from "store/useStore"
import useDeleteUser from "hooks/useDeleteUser"
import { DeleteOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons"
import CustomerLicensesTable from "components/tables/CustomerLicensesTable"
import useCustomerUsersData from "hooks/useCustomerUsersData"
import useBanUser from "hooks/useBanUser"
import useUnbanUser from "hooks/useUnbanUser"

type paramsTypes = {
    id: string
}

const Cabinet: React.FC = observer(() => {
    const { id: stringId } = useParams<paramsTypes>()
    const id = Number.parseInt(stringId)
    const { data, loading, error, refetch } = useGetClientQuery({ variables: { id } })

    const { data: users, loading: usersLoading, reload: reloadUsers } = useCustomerUsersData(id)
    const { authService } = useStore()
    const { query: deleteQuery, loading: deleteLoading } = useDeleteUser()
    const { query: banQuery, loading: banLoading } = useBanUser()
    const { query: unbanQuery, loading: unbanLoading } = useUnbanUser()

    const userRole = authService.user?.profile.role
    const canEditCustomer = userRole === OWNER_ROLE || userRole === DEVELOPER_ROLE
    const canCreateCustomer = userRole === OWNER_ROLE || userRole === DEVELOPER_ROLE

    if (loading) return <Loading height="70vh" size="big" />
    if (error) message.error(error.message)

    const customerData = data?.client

    const onSuccessDelete = () => {
        reloadUsers()
        message.success("Пользователь удален")
    }

    const onErrorDelete = () => {
        message.error("Ошибка при удалении пользователя")
    }

    const onSuccessBan = () => {
        reloadUsers()
        message.success("Пользователь заблокирован")
    }

    const onSuccessUnban = () => {
        reloadUsers()
        message.success("Пользователь разблокирован")
    }

    const onErrorBan = () => {
        message.error("Ошибка при блокировке/разблокировке пользователя")
    }

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
            key: "actions1",
            colSpan: 3,
            width: 40,
            render: (_items: any, item: any) => {
                if (item.canEdit)
                    return (
                        <EditProfile
                            buttonSize="middle"
                            buttonType="circle"
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
            width: 40,
            render: (_items: any, item: any) => {
                if (item.canEdit) {
                    if (item.isBanned) {
                        return (
                            <Popconfirm
                                title="Вы уверены, что хотите разблокировать пользователя?"
                                onConfirm={() =>
                                    unbanQuery(
                                        item.userId,
                                        () => onSuccessUnban(),
                                        () => onErrorBan()
                                    )
                                }
                            >
                                <Tooltip title="Разблокировать">
                                    <Button
                                        shape="circle"
                                        type="link"
                                        icon={<UnlockOutlined />}
                                        loading={banLoading || unbanLoading}
                                    />
                                </Tooltip>
                            </Popconfirm>
                        )
                    }

                    return (
                        <Popconfirm
                            title="Вы уверены, что хотите заблокировать пользователя?"
                            onConfirm={() =>
                                banQuery(
                                    item.userId,
                                    () => onSuccessBan(),
                                    () => onErrorBan()
                                )
                            }
                        >
                            <Tooltip title="Заблокировать">
                                <Button
                                    type="link"
                                    shape="circle"
                                    icon={<LockOutlined />}
                                    loading={banLoading || unbanLoading}
                                />
                            </Tooltip>
                        </Popconfirm>
                    )
                }
            },
        },
        {
            key: "actions3",
            colSpan: 0,
            width: 40,
            render: (_items: any, item: any) => {
                if (item.canEdit)
                    return (
                        <Popconfirm
                            title="Вы уверены, что хотите удалить пользователя?"
                            onConfirm={() =>
                                deleteQuery(
                                    item.userId,
                                    () => onSuccessDelete(),
                                    () => onErrorDelete()
                                )
                            }
                        >
                            <Tooltip title="Удалить">
                                <Button
                                    shape="circle"
                                    danger
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    loading={deleteLoading}
                                />
                            </Tooltip>
                        </Popconfirm>
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
                                licenseIds={customerData?.licenseIds || []}
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
            <Card isSecondary>
                <CardHeader title="Список лицензий" Form={() => <div />} size="small" />

                <CustomerLicensesTable customerId={customerData?.id || 0} />
            </Card>
        </FadePage>
    )
})

export default Cabinet
