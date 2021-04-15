import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space } from "antd"
import { PlusOutlined } from "@ant-design/icons"

type propTypes = {
    buttonSize?: "large" | "middle"
}

const AddCustomer: React.FC<propTypes> = ({ buttonSize = "middle" }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()

    const onFinish = (data: any) => {
        console.log(data)

        setVisible(false)
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
                        <Button onClick={() => form.submit()} type="primary" size="large">
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
                </Form>
            </Drawer>
        </>
    )
}

export default AddCustomer
