import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message, InputNumber, DatePicker } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useEditLicenseMutation } from "types"
import SoftwareSelect from "components/selects/SoftwareSelect"
import CustomerSelect from "components/selects/CustomerSelect"
import moment from "moment"

const { RangePicker } = DatePicker

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    type?: "link" | "primary"
    id: number
    number: string
    countUsers: number
    startDate: string
    expiresDate: string
    defaultClientId: number
    defaultSoftwareId: number
}

const EditLicense: React.FC<propTypes> = ({
    buttonSize = "middle",
    type = "link",
    id,
    number,
    countUsers,
    startDate,
    expiresDate,
    defaultClientId,
    defaultSoftwareId,
    reload,
}) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useEditLicenseMutation()

    const [softwareId, setSoftwareId] = useState(defaultSoftwareId)

    const onFinish = (data: any) => {
        query({
            variables: {
                id,
                number: data.number,
                clientId: data.clientId ? data.clientId : null,
                softwareId,
                countUsers: data.countUsers,
                startDate: data.range[0].format(),
                expiresDate: data.range[1].format(),
            },
        })
            .then(() => {
                message.success("Модуль успешно изменен")
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
                                name="number"
                                label="Номер лицензии"
                                rules={[{ required: true, message: "Введите номер лицензии" }]}
                                initialValue={number}
                            >
                                <Input size="large" placeholder="Введите номер лицензии" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="range"
                                label="Срок действия"
                                rules={[
                                    {
                                        type: "array" as const,
                                        required: true,
                                        message: "Введите срок действия лицензии",
                                    },
                                ]}
                                initialValue={[moment(startDate), moment(expiresDate)]}
                            >
                                <RangePicker format="DD.MM.YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="countUsers"
                                label="Кол-во пользователей"
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите кол-во пользователей",
                                    },
                                ]}
                                initialValue={countUsers}
                            >
                                <InputNumber min={0} />
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
                                initialValue={defaultSoftwareId}
                            >
                                <SoftwareSelect initValue={defaultSoftwareId} onChange={(sId) => setSoftwareId(sId)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <CustomerSelect initValue={defaultClientId} />
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default EditLicense
