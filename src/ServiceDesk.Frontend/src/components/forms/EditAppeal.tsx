import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useEditRequestMutation } from "types"
import TextArea from "antd/lib/input/TextArea"
import SoftwareSelect from "components/selects/SoftwareSelect"
import ModuleSelect from "components/selects/ModuleSelect"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    type: "link" | "primary"
    id: number
    theme: string
    text: string
    softwareId?: number
    moduleId?: number
    customerId: number
}

const EditAppeal: React.FC<propTypes> = ({
    buttonSize = "middle",
    reload,
    id,
    theme,
    text,
    customerId,
    softwareId,
    moduleId,
    type,
}) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useEditRequestMutation()

    const [selectedSoftwareId, setSelectedSoftwareId] = useState(softwareId || 0)
    const [selectedModuleId, setSelectedModuleId] = useState(moduleId)

    const onFinish = (data: any) => {
        query({
            variables: {
                id,
                theme: data.theme,
                softwareModuleId: data.moduleId ? data.moduleId : null,
                text: data.text,
                clientId: customerId,
            },
        })
            .then(() => {
                message.success("Обращение успешно изменено")
                reload()
                setVisible(false)
            })
            .catch((error) => {
                console.log(error)
                message.error("Произошла ошибка")
            })
    }

    const handleSoftwareChange = (softwareId: number) => {
        setSelectedSoftwareId(softwareId)

        setSelectedModuleId(undefined)
        form.resetFields(["moduleId"])
        form.setFields([{ name: "moduleId", touched: false, value: undefined }])
    }

    return (
        <>
            <Button type={type} onClick={() => setVisible(true)} size={buttonSize}>
                <EditOutlined /> Редактировать
            </Button>
            <Drawer
                title="Редактирование обращения"
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
                                name="theme"
                                label="Тема обращения"
                                initialValue={theme}
                                rules={[{ required: true, message: "Введите тему обращения" }]}
                            >
                                <Input size="large" placeholder="Тема обращения" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="softwareId"
                                label="Название ПО"
                                getValueFromEvent={(args) => args}
                                initialValue={softwareId}
                            >
                                <SoftwareSelect
                                    onChange={(sId) => handleSoftwareChange(sId)}
                                    initValue={softwareId}
                                    removable
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <ModuleSelect
                                disabled={selectedSoftwareId === 0}
                                softwareId={selectedSoftwareId}
                                initValue={selectedModuleId}
                                removable
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="text"
                                label="Текст обращения"
                                initialValue={text}
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

export default EditAppeal
