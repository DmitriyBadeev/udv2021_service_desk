import { Button, message, Popconfirm, Table } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import React from "react"
import { useGetLicensesQuery, useDeleteLicenseMutation } from "types"
import AddLicense from "components/forms/directories/AddLicense"
import { Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import { DeleteOutlined } from "@ant-design/icons"
import EditLicense from "components/forms/directories/EditLicense"

const License: React.FC = () => {
    const [deleteQuery, { loading: deleteLoading }] = useDeleteLicenseMutation()
    const { data, loading, error, refetch } = useGetLicensesQuery()
    const dataSource = data?.licenses?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    if (error) message.error(error.message)
    console.log(data)

    const deleteHandler = (id: number) => {
        deleteQuery({ variables: { id } })
            .then(() => {
                message.success("Лицензия удалена")
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
            title: "Номер",
            dataIndex: "number",
            key: "number",
        },
        {
            title: "Заказчик",
            dataIndex: "client",
            key: "client",
        },
        {
            title: "Название ПО",
            dataIndex: "software",
            key: "software",
        },
        {
            title: "Кол-во пользователей",
            dataIndex: "countOfUsers",
            key: "countOfUsers",
        },
        {
            title: "Начало действия",
            key: "software",
            render: (_items: any, item: any) => {
                return <Text>{getNumericStringDate(item.startDate)}</Text>
            },
        },
        {
            title: "Конец действия",
            key: "software",
            render: (_items: any, item: any) => {
                return <Text>{getNumericStringDate(item.expiresDate)}</Text>
            },
        },
        {
            title: "Действия",
            key: "actions",
            colSpan: 2,
            width: 150,
            render: (_items: any, item: any) => {
                return (
                    <EditLicense
                        buttonSize="middle"
                        id={item.id}
                        number={item.number}
                        countUsers={item.countOfUsers}
                        defaultClientId={item.clientId}
                        defaultSoftwareId={item.softwareId}
                        expiresDate={item.expiresDate}
                        startDate={item.startDate}
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
                        title="Вы уверены, что хотите удалить лицензию?"
                        onConfirm={() => deleteHandler(item.id)}
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} loading={deleteLoading}>
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
                    title="Справочник лицензий"
                    Form={() => <AddLicense reload={refetch} buttonSize="large" />}
                />
                <Table size="middle" dataSource={dataSource} columns={columns} loading={loading} />
            </Card>
        </FadePage>
    )
}

export default License
