import { Button, Table, message, Popconfirm, Tooltip } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import AddCustomer from "components/forms/AddCustomer"
import FadePage from "components/fade/FadePage"
import React from "react"
import { Link } from "react-router-dom"
import { useGetClientsQuery, useDeleteClientMutation, useBlockClientMutation, useUnblockClientMutation } from "types"
import { Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import EditCustomer from "components/forms/EditCustomer"
import { DeleteOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons"

const Cabinets: React.FC = () => {
    const { loading, data, error, refetch } = useGetClientsQuery()
    const [deleteQuery, { loading: deleteLoading }] = useDeleteClientMutation()
    const [blockQuery, { loading: blockLoading }] = useBlockClientMutation()
    const [unblockQuery, { loading: unblockLoading }] = useUnblockClientMutation()
    if (error) message.error(error.message)

    const dataSource = data?.clients?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    const deleteHandler = (id: number) => {
        console.log(`removing: ${id}`)

        deleteQuery({ variables: { id } })
            .then(() => {
                message.success("Заказчик удален")
                refetch()
            })
            .catch((error) => {
                console.log(error)
                message.error("Произошла ошибка")
            })
    }

    const blockHandler = (id: number) => {
        console.log(`blocking: ${id}`)

        blockQuery({ variables: { id } })
            .then(() => {
                message.success("Заказчик заблокирован")
                refetch()
            })
            .catch((error) => {
                console.log(error)
                message.error("Произошла ошибка")
            })
    }

    const unblockHandler = (id: number) => {
        console.log(`unblocking: ${id}`)

        unblockQuery({ variables: { id } })
            .then(() => {
                message.success("Заказчик разблокирован")
                refetch()
            })
            .catch((error) => {
                console.log(error)
                message.error("Произошла ошибка")
            })
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
            render: (_items: any, item: any) => {
                return <Link to={`/cabinets/${item.id}`}>{item.name}</Link>
            },
        },
        {
            title: "Активность",
            dataIndex: "isActive",
            key: "isActive",
            render: (_items: any, item: any) => {
                return <Text>{item.isActive ? "Активен" : "Заблокирован"}</Text>
            },
        },
        {
            title: "Дата создания",
            dataIndex: "creationDate",
            key: "creationDate",
            render: (_items: any, item: any) => {
                return <Text>{getNumericStringDate(item.creationDate)}</Text>
            },
        },
        {
            title: "Действия",
            key: "actions1",
            colSpan: 3,
            width: 150,
            render: (_items: any, item: any) => {
                return (
                    <EditCustomer
                        buttonSize="middle"
                        id={item.id}
                        name={item.name}
                        licenseIds={item.licenseIds}
                        type="link"
                        reload={() => refetch()}
                    />
                )
            },
        },
        {
            key: "actions2",
            colSpan: 0,
            width: 40,
            render: (_items: any, item: any) => {
                if (item.isActive)
                    return (
                        <Popconfirm
                            title="Вы уверены, что хотите заблокировать заказчика?"
                            onConfirm={() => blockHandler(item.id)}
                        >
                            <Tooltip title="Заблокировать">
                                <Button shape="circle" type="link" icon={<LockOutlined />} loading={blockLoading} />
                            </Tooltip>
                        </Popconfirm>
                    )

                return (
                    <Popconfirm
                        title="Вы уверены, что хотите разблокировать заказчика?"
                        onConfirm={() => unblockHandler(item.id)}
                    >
                        <Tooltip title="Разблокировать">
                            <Button shape="circle" type="link" icon={<UnlockOutlined />} loading={unblockLoading} />
                        </Tooltip>
                    </Popconfirm>
                )
            },
        },
        {
            key: "actions3",
            colSpan: 0,
            width: 40,
            render: (_items: any, item: any) => {
                return (
                    <Popconfirm
                        title="Вы уверены, что хотите удалить заказчика?"
                        onConfirm={() => deleteHandler(item.id)}
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
                    title="Личные кабинеты заказчиков"
                    Form={() => <AddCustomer buttonSize="large" reload={() => refetch()} />}
                />
                <Table size="middle" dataSource={dataSource} columns={columns} loading={loading} />
            </Card>
        </FadePage>
    )
}

export default Cabinets
