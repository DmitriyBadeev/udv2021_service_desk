import { Button, Table, message, Popconfirm } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import AddCustomer from "components/forms/AddCustomer"
import FadePage from "components/fade/FadePage"
import React from "react"
import { Link } from "react-router-dom"
import { useGetClientsQuery, useDeleteClientMutation } from "types"
import { Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import EditCustomer from "components/forms/EditCustomer"
import { DeleteOutlined } from "@ant-design/icons"

const Cabinets: React.FC = () => {
    const { loading, data, error, refetch } = useGetClientsQuery()
    const [deleteQuery, { loading: deleteLoading }] = useDeleteClientMutation()
    if (error) message.error(error.message)

    const dataSource = data?.clients?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    const deleteHandler = (id: number) => {
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
            key: "actions",
            colSpan: 2,
            width: 150,
            render: (_items: any, item: any) => {
                return (
                    <EditCustomer
                        buttonSize="middle"
                        id={item.id}
                        name={item.name}
                        type="link"
                        reload={() => refetch()}
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
                    <Popconfirm
                        title="Вы уверены, что хотите удалить заказчика?"
                        onConfirm={() => deleteHandler(item.id)}
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
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
                <CardHeader
                    title="Личные кабинеты заказчиков"
                    Form={() => <AddCustomer buttonSize="large" reload={() => refetch()} />}
                />
                <Table size="middle" dataSource={dataSource} columns={columns} loading={loading || deleteLoading} />
            </Card>
        </FadePage>
    )
}

export default Cabinets
