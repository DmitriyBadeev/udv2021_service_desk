import React from "react"
import useGetAllUsers from "hooks/useGetAllUsers"
import Loading from "components/loading/Loading"
import FadePage from "components/fade/FadePage"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import { Button, message, Popconfirm, Table } from "antd"
import AddUserDeveloper from "components/forms/AddUserDeveloper"
import { Link } from "react-router-dom"
import { Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import { DeleteOutlined } from "@ant-design/icons"
import { getRoleDisplayName } from "helpers/roleHelper"
import EditProfile from "components/forms/EditProfile"
import useDeleteUser from "hooks/useDeleteUser"

const Users: React.FC = () => {
    const { data, loading, reload } = useGetAllUsers()
    const { query, loading: deleteLoading } = useDeleteUser()

    if (loading) return <Loading height="70vh" size="big" />
    const dataSource = data
        ?.map((s: any, i: any) => {
            return {
                key: i,
                ...s,
            }
        })
        .sort((a: any, b: any) => b.role.length - a.role.length)

    const onSuccessDelete = () => {
        reload()
        message.success("Пользователь удален")
    }

    const onErrorDelete = () => {
        message.error("Ошибка при удалении пользователя")
    }

    const columns = [
        {
            title: "ФИО",
            dataIndex: "name",
            key: "name",
            render: (_items: any, item: any) => {
                return (
                    <Link to={`/profile/${item.userId}`}>
                        {item.lastName} {item.firstName} {item.patronymic}
                    </Link>
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
            dataIndex: "isActive",
            key: "isActive",
            render: (_items: any, item: any) => {
                return <Text>{item.isBanned ? "Заблокирован" : "Активен"}</Text>
            },
        },
        {
            title: "Дата создания",
            dataIndex: "creationDate",
            key: "creationDate",
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
                            reload={reload}
                        />
                    )
            },
        },
        {
            key: "actions2",
            colSpan: 0,
            width: 100,
            render: (_items: any, item: any) => {
                if (item.canEdit)
                    return (
                        <Popconfirm
                            title="Вы уверены, что хотите удалить пользователя?"
                            onConfirm={() =>
                                query(
                                    item.userId,
                                    () => onSuccessDelete(),
                                    () => onErrorDelete()
                                )
                            }
                        >
                            <Button type="link" danger loading={deleteLoading} icon={<DeleteOutlined />}>
                                Удалить
                            </Button>
                        </Popconfirm>
                    )
            },
        },
    ]

    return (
        <FadePage>
            <Card>
                <CardHeader title="Пользователи" Form={() => <AddUserDeveloper buttonSize="large" reload={reload} />} />
                <Table size="middle" dataSource={dataSource} columns={columns} loading={loading || deleteLoading} />
            </Card>
        </FadePage>
    )
}

export default Users
