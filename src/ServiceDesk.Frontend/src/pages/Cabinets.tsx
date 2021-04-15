import { Button, Table } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import AddCustomer from "components/forms/AddCustomer"
import FadePage from "components/fade/FadePage"
import React from "react"
import { Link } from "react-router-dom"

const Cabinets: React.FC = () => {
    const dataSource = [
        {
            key: "1",
            id: "1",
            name: "Уралвагонзавод",
            isActive: "Активен",
            creationDate: "21.04.2021",
            countCostomers: 6,
        },
        {
            key: "2",
            id: "2",
            name: "РосПил",
            isActive: "Активен",
            creationDate: "14.04.2021",
            countCostomers: 10,
        },
    ]

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
        },
        {
            title: "Дата создания",
            dataIndex: "creationDate",
            key: "creationDate",
        },
        {
            title: "Кол-во представителей заказчика",
            dataIndex: "countCostomers",
            key: "countCostomers",
        },
        {
            title: "Действия",
            key: "actions",
            colSpan: 2,
            width: 150,
            render: (_items: any, item: any) => {
                return <Button type="link">Редактировать</Button>
            },
        },
        {
            key: "actions2",
            colSpan: 0,
            width: 100,
            render: (_items: any, item: any) => {
                return (
                    <Button type="link" danger>
                        Удалить
                    </Button>
                )
            },
        },
    ]

    return (
        <FadePage>
            <Card>
                <CardHeader title="Личные кабинеты заказчиков" Form={AddCustomer} />
                <Table size="middle" dataSource={dataSource} columns={columns} />
            </Card>
        </FadePage>
    )
}

export default Cabinets
