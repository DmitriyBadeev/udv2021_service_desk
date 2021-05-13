import { Button, message, Popconfirm, Table } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import React from "react"
import { useGetSoftwaresQuery, useDeleteSoftwareMutation } from "types"
import AddSoftware from "components/forms/directories/AddSoftware"
import EditSoftware from "components/forms/directories/EditSoftware"
import { DeleteOutlined } from "@ant-design/icons"

const Software: React.FC = () => {
    const [deleteQuery, { loading: deleteLoading }] = useDeleteSoftwareMutation()
    const { data, loading, error, refetch } = useGetSoftwaresQuery()
    const dataSource = data?.softwares?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    if (error) message.error(error.message)

    const deleteHandler = (id: number) => {
        deleteQuery({ variables: { id } })
            .then(() => {
                message.success("ПО удалено")
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
            title: "Название ПО",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Действия",
            key: "actions",
            colSpan: 2,
            width: 150,
            render: (_items: any, item: any) => {
                return (
                    <EditSoftware
                        buttonSize="middle"
                        id={item.id}
                        title={item.title}
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
                    <Popconfirm title="Вы уверены, что хотите удалить ПО?" onConfirm={() => deleteHandler(item.id)}>
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
                <CardHeader title="Справочник ПО" Form={() => <AddSoftware reload={refetch} buttonSize="large" />} />
                <Table size="middle" dataSource={dataSource} columns={columns} loading={loading} />
            </Card>
        </FadePage>
    )
}

export default Software
