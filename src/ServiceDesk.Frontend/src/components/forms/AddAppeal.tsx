import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useCreateRequestMutation } from "types"
import TextArea from "antd/lib/input/TextArea"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    customerId: number
}

const AddAppeal: React.FC<propTypes> = ({ buttonSize = "middle", customerId, reload }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useCreateRequestMutation()

    const onFinish = (data: any) => {
        query({ variables: { title: data.theme, text: data.text, clientId: customerId } })
            .then(() => {
                message.success("Обращение успешно создано")
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
                <PlusOutlined /> Создать
            </Button>
            <Drawer
                title="Создание обращения"
                width={720}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space size="large" style={{ padding: "5px 15px" }}>
                        <Button onClick={() => form.submit()} type="primary" size="large" loading={loading}>
                            Создать
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
                                name="theme"
                                label="Тема обращения"
                                rules={[{ required: true, message: "Введите тему обращения" }]}
                            >
                                <Input size="large" placeholder="Введите тему обращения" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="text"
                                label="Текст обращения"
                                rules={[{ required: true, message: "Текст обращения не может быть пустым" }]}
                            >
                                <TextArea size="large" rows={5} placeholder="Текст обращения"></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default AddAppeal