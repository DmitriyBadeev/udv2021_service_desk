import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useEditClientMutation } from "types"
import LicensesSelectMany from "components/selects/LicensesSelectMany"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    type: "link" | "primary"
    id: number
    name: string
    licenseIds: number[]
}

const EditCustomer: React.FC<propTypes> = ({ buttonSize = "middle", reload, id, name, licenseIds, type }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useEditClientMutation()

    const onFinish = (data: any) => {
        query({ variables: { name: data.name, id, licenseIds: data.licenses } })
            .then(() => {
                message.success("Заказчик успешно изменен")
                reload()
                setVisible(false)
            })
            .catch((error) => {
                console.log(error)
                message.error("Произошла ошибка")
            })
    }

    return (
        <>
            <Button type={type} onClick={() => setVisible(true)} size={buttonSize}>
                <EditOutlined /> Редактировать
            </Button>
            <Drawer
                title="Редактирование личного кабинета заказчика"
                width={720}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space size="large" style={{ padding: "5px 15px" }}>
                        <Button onClick={() => form.submit()} type="primary" size="large" loading={loading}>
                            Редактировать
                        </Button>
                        <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }} size="large">
                            Отмена
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Название организации"
                                initialValue={name}
                                rules={[{ required: true, message: "Введите название организации" }]}
                            >
                                <Input size="large" placeholder="Название организации" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <LicensesSelectMany initValues={licenseIds} />
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default EditCustomer
