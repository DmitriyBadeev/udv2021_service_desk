import { message, Table } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import React from "react"
import { useGetLicensesQuery, useDeleteLicenseMutation } from "types"
import AddLicense from "components/forms/directories/AddLicense"

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

    const columns = [
        {
            title: "Название справочника",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Действия",
            key: "actions",
            width: 300,
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
