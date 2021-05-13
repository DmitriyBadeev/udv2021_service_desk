import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useCreateModuleMutation } from "types"
import SoftwareSelect from "components/selects/SoftwareSelect"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    type?: "link" | "primary"
}

const AddModule: React.FC<propTypes> = ({ buttonSize = "middle", type = "primary", reload }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useCreateModuleMutation()

    const onFinish = (data: any) => {
        query({ variables: { title: data.title, softwareId: data.softwareId } })
            .then(() => {
                message.success("Модуль успешно добавлен")
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
                title="Добавление функционального модуля ПО"
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
                                label="Название модуля"
                                rules={[{ required: true, message: "Введите название модуля" }]}
                            >
                                <Input size="large" placeholder="Введите название модуля" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="softwareId"
                                label="Название ПО"
                                rules={[{ required: true, message: "Выберите ПО" }]}
                                getValueFromEvent={(args) => args}
                            >
                                <SoftwareSelect />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default AddModule
