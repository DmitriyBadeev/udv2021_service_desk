import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message, DatePicker, InputNumber } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useCreateLicenseMutation } from "types"
import SoftwareSelect from "components/selects/SoftwareSelect"
import CustomerSelect from "components/selects/CustomerSelect"

const { RangePicker } = DatePicker

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    type?: "link" | "primary"
}

const AddLicense: React.FC<propTypes> = ({ buttonSize = "middle", type = "primary", reload }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [query, { loading }] = useCreateLicenseMutation()

    const onFinish = (data: any) => {
        query({
            variables: {
                number: data.number,
                clientId: data.clientId ? data.clientId : null,
                softwareId: data.softwareId,
                countUsers: data.countUsers,
                startDate: data.range[0].format(),
                expiresDate: data.range[1].format(),
            },
        })
            .then(() => {
                message.success("Лицензия успешно добавлена")
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
                title="Добавление лицензии"
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
                                name="number"
                                label="Номер лицензии"
                                rules={[{ required: true, message: "Введите номер лицензии" }]}
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
                                initialValue={0}
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
                            >
                                <SoftwareSelect />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <CustomerSelect />
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default AddLicense
