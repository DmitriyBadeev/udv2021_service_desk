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
        message.success("???????????????????????? ????????????")
    }

    const onErrorDelete = () => {
        message.error("???????????? ?????? ???????????????? ????????????????????????")
    }

    const onSuccessBan = () => {
        reloadUsers()
        message.success("???????????????????????? ????????????????????????")
    }

    const onSuccessUnban = () => {
        reloadUsers()
        message.success("???????????????????????? ??????????????????????????")
    }

    const onErrorBan = () => {
        message.error("???????????? ?????? ????????????????????/?????????????????????????? ????????????????????????")
    }

    const columns = [
        {
            title: "??????",
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
            title: "????. ??????????",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "????????",
            key: "role",
            render: (_items: any, item: any) => {
                return <Text>{getRoleDisplayName(item.role)}</Text>
            },
        },
        {
            title: "????????????????????",
            key: "isActive",
            render: (_items: any, item: any) => {
                return <Text>{item.isBanned ? "????????????????????????" : "??????????????????????"}</Text>
            },
        },
        {
            title: "???????? ????????????????",
            key: "registerDate",
            render: (_items: any, item: any) => {
                return <Text>{getNumericStringDate(item.registerDate)}</Text>
            },
        },

        {
            title: "????????????????",
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
                            role={item.role}
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
                                title="???? ??????????????, ?????? ???????????? ???????????????????????????? ?????????????????????????"
                                onConfirm={() =>
                                    unbanQuery(
                                        item.userId,
                                        () => onSuccessUnban(),
                                        () => onErrorBan()
                                    )
                                }
                            >
                                <Tooltip title="????????????????????????????">
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
                            title="???? ??????????????, ?????? ???????????? ?????????????????????????? ?????????????????????????"
                            onConfirm={() =>
                                banQuery(
                                    item.userId,
                                    () => onSuccessBan(),
                                    () => onErrorBan()
                                )
                            }
                        >
                            <Tooltip title="??????????????????????????">
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
                            title="???? ??????????????, ?????? ???????????? ?????????????? ?????????????????????????"
                            onConfirm={() =>
                                deleteQuery(
                                    item.userId,
                                    () => onSuccessDelete(),
                                    () => onErrorDelete()
                                )
                            }
                        >
                            <Tooltip title="??????????????">
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
                    <Descriptions.Item label="??????????????????????????">{customerData?.id}</Descriptions.Item>
                    <Descriptions.Item label="????????????">
                        {customerData?.isActive ? "??????????????" : "????????????????????????"}
                    </Descriptions.Item>
                    <Descriptions.Item label="???????? ????????????????">
                        {getNumericStringDate(customerData?.creationDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label="???????? ????????????????????">
                        {getNumericStringDate(customerData?.lockDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label="?????????? ??????????????????????????">{customerData?.maxUsers}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Card isSecondary>
                <CardHeader
                    title={
                        <span>
                            ?????????????????????????? ??????????????????{" "}
                            <Text $color="grey4" $large $bold>
                                ({users.filter((u: any) => !u.isBanned).length}
                                {"\u2009"}/{"\u2009"}
                                {customerData?.maxUsers})
                            </Text>
                        </span>
                    }
                    Form={() =>
                        canCreateCustomer ? (
                            <AddUserCustomer
                                customerId={id}
                                reload={() => reloadUsers()}
                                disabled={users.length >= (customerData?.maxUsers || 0)}
                            />
                        ) : null
                    }
                    size="small"
                />

                <Table size="middle" loading={usersLoading} dataSource={users} columns={columns} />
            </Card>
            <Card isSecondary>
                <CardHeader title="???????????? ????????????????" Form={() => <div />} size="small" />

                <CustomerLicensesTable customerId={customerData?.id || 0} />
            </Card>
        </FadePage>
    )
})

export default Cabinet
