import React from "react"
import { message, Table } from "antd"
import { useGetLicensesQuery } from "types"
import { Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"

type propTypes = {
    customerId: number
}

const CustomerLicensesTable: React.FC<propTypes> = ({ customerId }) => {
    const { data, loading, error } = useGetLicensesQuery()
    const dataSource = data?.licenses
        ?.filter((l) => l?.clientId === customerId)
        .map((s, i) => {
            return {
                key: i,
                ...s,
            }
        })

    if (error) message.error(error.message)

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
    ]

    return <Table size="middle" loading={loading} dataSource={dataSource} columns={columns} />
}

export default CustomerLicensesTable
