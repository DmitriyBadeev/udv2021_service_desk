import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useEditSoftwareMutation } from "types"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    type?: "link" | "primary"
    id: number
    title: string
}

const EditSoftware: React.FC<propTypes> = ({ buttonSize = "middle", type = "link", id, title, reload }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useEditSoftwareMutation()

    const onFinish = (data: any) => {
        query({ variables: { title: data.title, id } })
            .then(() => {
                message.success("ПО успешно изменено")
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
                title="Редактирование ПО"
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
                                name="title"
                                label="Название ПО"
                                initialValue={title}
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

export default EditSoftware
