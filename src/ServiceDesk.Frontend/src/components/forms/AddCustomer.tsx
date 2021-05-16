import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useCreateClientMutation } from "types"
import LicensesSelectMany from "components/selects/LicensesSelectMany"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
}

const AddCustomer: React.FC<propTypes> = ({ buttonSize = "middle", reload }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useCreateClientMutation()

    const onFinish = (data: any) => {
        query({ variables: { name: data.name, licenseIds: data.licenses } })
            .then(() => {
                message.success("Заказчик успешно создан")
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
            <Button type="primary" onClick={() => setVisible(true)} size={buttonSize}>
                <PlusOutlined /> Добавить
            </Button>
            <Drawer
                title="Добавление личного кабинета"
                width={720}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space size="large" style={{ padding: "5px 15px" }}>
                        <Button onClick={() => form.submit()} type="primary" size="large" loading={loading}>
                            Добавить
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
                                rules={[{ required: true, message: "Введите название организации" }]}
                            >
                                <Input size="large" placeholder="Название организации" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <LicensesSelectMany />
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default AddCustomer
