import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useEditModuleMutation } from "types"
import SoftwareSelect from "components/selects/SoftwareSelect"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    type?: "link" | "primary"
    id: number
    title: string
    defaultSoftwareId: number
}

const EditModule: React.FC<propTypes> = ({
    buttonSize = "middle",
    type = "link",
    id,
    title,
    defaultSoftwareId,
    reload,
}) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useEditModuleMutation()

    const [softwareId, setSoftwareId] = useState(defaultSoftwareId)

    const onFinish = (data: any) => {
        query({ variables: { title: data.title, id, softwareId } })
            .then(() => {
                message.success("Лицензия успешно изменена")
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
                title="Редактирование лицензии"
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
                                label="Название модуля"
                                initialValue={title}
                                rules={[{ required: true, message: "Введите название модуля" }]}
                            >
                                <Input size="large" placeholder="Введите название модуля" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <SoftwareSelect initValue={defaultSoftwareId} onChange={(sId) => setSoftwareId(sId)} />
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default EditModule
