import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useCreateSoftwareMutation } from "types"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    type?: "link" | "primary"
}

const AddSoftware: React.FC<propTypes> = ({ buttonSize = "middle", type = "primary", reload }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useCreateSoftwareMutation()

    const onFinish = (data: any) => {
        query({ variables: { title: data.title } })
            .then(() => {
                message.success("ПО успешно добавлено")
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
                <PlusOutlined /> Добавить запись
            </Button>
            <Drawer
                title="Добавление ПО"
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
                                name="title"
                                label="Название ПО"
                                rules={[{ required: true, message: "Введите название ПО" }]}
                            >
                                <Input size="large" placeholder="Введите название ПО" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default AddSoftware
