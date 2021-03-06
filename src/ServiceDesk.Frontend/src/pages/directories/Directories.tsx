import { Table } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import React from "react"
import { Link } from "react-router-dom"
import AddSoftware from "components/forms/directories/AddSoftware"
import AddModule from "components/forms/directories/AddModule"
import AddLicense from "components/forms/directories/AddLicense"

const Directories: React.FC = () => {
    const columns = [
        {
            title: "Название справочника",
            key: "name",
            render: (_items: any, item: any) => {
                return <Link to={item.link}>{item.name}</Link>
            },
        },
        {
            title: "Действия",
            key: "actions",
            width: 300,
            render: (_items: any, item: any) => {
                return item.form()
            },
        },
    ]

    const data = [
        {
            key: "software",
            name: "Справочник ПО",
            link: "/directories/softwares",
            form: () => <AddSoftware reload={() => {}} type="link" />,
        },
        {
            key: "softwareModules",
            name: "Справочник функциональных модулей ПО",
            link: "/directories/modules",
            form: () => <AddModule reload={() => {}} type="link" />,
        },
        {
            key: "license",
            name: "Справочник лицензий",
            link: "/directories/licenses",
            form: () => <AddLicense reload={() => {}} type="link" />,
        },
    ]

    return (
        <FadePage>
            <Card>
                <CardHeader title="Справочники" Form={() => <div />} />
                <Table size="middle" dataSource={data} columns={columns} />
            </Card>
        </FadePage>
    )
}

export default Directories
