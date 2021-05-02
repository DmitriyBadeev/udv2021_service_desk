import { Button, message, Popconfirm, Table } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import { useGetCustomerRequestsQuery, useDeleteRequestMutation } from "types"
import React from "react"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import { Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import { Link } from "react-router-dom"
import AddAppeal from "components/forms/AddAppeal"
import EditAppeal from "components/forms/EditAppeal"

const CustomerAppeals: React.FC = observer(() => {
    const { authService } = useStore()

    const customerId = Number.parseInt(authService.user?.profile.customer_id)

    const { loading, data, error, refetch } = useGetCustomerRequestsQuery({ variables: { customerId } })
    const [deleteQuery, { loading: deleteLoading }] = useDeleteRequestMutation()

    if (error) message.error(error.message)

    const dataSource = data?.clientRequests?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    dataSource?.map((el) => el.software)

    const deleteHandler = (id: string) => {
        deleteQuery({ variables: { id } })
            .then(() => {
                message.success("Обращение удалено")
                refetch()
            })
            .catch((error) => {
                console.log(error)
                message.error("Произошла ошибка")
            })
    }

    const columns = [
        {
            title: "Тема",
            key: "theme",
            width: 500,
            render: (_items: any, item: any) => {
                return <Link to={`/appeals/${item.id}`}>{item.theme}</Link>
            },
        },
        {
            title: "Статус",
            dataIndex: "requestStatus",
            key: "status",
        },
        {
            title: "Название ПО",
            dataIndex: "software",
            key: "software",
            render: (_items: any, item: any) => {
                return <Text>{item.software || "—"}</Text>
            },
        },
        {
            title: "Дата создания",
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
                    <EditAppeal
                        buttonSize="middle"
                        id={item.id}
                        theme={item.theme}
                        text={item.text}
                        customerId={customerId}
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
                        title="Вы уверены, что хотите удалить обращение?"
                        onConfirm={() => deleteHandler(item.id)}
                    >
                        <Button type="link" danger>
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
                    title="Обращения"
                    Form={() => <AddAppeal buttonSize="large" reload={() => refetch()} customerId={customerId} />}
                />

                <Table size="middle" dataSource={dataSource} columns={columns} loading={loading || deleteLoading} />
            </Card>
        </FadePage>
    )
})

export default CustomerAppeals
