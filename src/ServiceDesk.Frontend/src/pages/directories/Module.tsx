import { DeleteOutlined } from "@ant-design/icons"
import { Button, message, Popconfirm, Table } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import React from "react"
import { useGetModulesQuery, useDeleteModuleMutation } from "types"
import AddModule from "components/forms/directories/AddModule"
import EditModule from "components/forms/directories/EditModule"

const Module: React.FC = () => {
    const [deleteQuery, { loading: deleteLoading }] = useDeleteModuleMutation()
    const { data, loading, error, refetch } = useGetModulesQuery()
    const dataSource = data?.softwareModules?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    if (error) message.error(error.message)

    const deleteHandler = (id: number) => {
        deleteQuery({ variables: { id } })
            .then(() => {
                message.success("Модуль удален")
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
            title: "Название модуля",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Название ПО",
            dataIndex: "software",
            key: "software",
        },
        {
            title: "Действия",
            key: "actions",
            colSpan: 2,
            width: 150,
            render: (_items: any, item: any) => {
                return (
                    <EditModule
                        buttonSize="middle"
                        id={item.id}
                        title={item.title}
                        defaultSoftwareId={item.softwareId}
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
                        title="Вы уверены, что хотите удалить модуль ПО?"
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
                    title="Справочник функциональных модулей ПО"
                    Form={() => <AddModule reload={refetch} buttonSize="large" />}
                />
                <Table size="middle" dataSource={dataSource} columns={columns} loading={loading} />
            </Card>
        </FadePage>
    )
}

export default Module
