import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message } from "antd"
import { EditOutlined } from "@ant-design/icons"
import useChangePassword, { ChangePasswordData } from "hooks/useChangePassword"

type propTypes = {
    userId: string
}

const ChangePassword: React.FC<propTypes> = ({ userId }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const { query, loading } = useChangePassword()

    const onFinish = (data: any) => {
        const changePasswordData: ChangePasswordData = {
            UserId: userId,
            OldPassword: data.old_password,
            NewPassword: data.password,
        }

        query(changePasswordData, onSuccess, onError)
    }

    const onSuccess = (res: any) => {
        message.success("Пароль успешно изменен")
        setVisible(false)
    }

    const onError = (error: any) => {
        message.error("Произошла ошибка")
    }

    return (
        <>
            <Button type="link" onClick={() => setVisible(true)} size="small">
                <EditOutlined /> Изменить пароль
            </Button>
            <Drawer
                title="Изменение пароля"
                width={720}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ paddingBottom: 50 }}
                footer={
                    <Space size="large" style={{ padding: "5px 15px" }}>
                        <Button onClick={() => form.submit()} type="primary" size="large" loading={loading}>
                            Изменить
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
                                name="old_password"
                                label="Старый пароль"
                                rules={[{ required: true, message: "Введите старый пароль" }]}
                            >
                                <Input.Password size="large" placeholder="Введите старый пароль" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="password"
                                label="Новый пароль"
                                rules={[{ required: true, message: "Введите новый пароль" }]}
                            >
                                <Input.Password size="large" placeholder="Введите новый пароль" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="confirm_password"
                                label="Повторение пароля"
                                dependencies={["password"]}
                                rules={[
                                    {
                                        required: true,
                                        message: "Повторите пароль",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error("Пароли должны совпадать"))
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password size="large" placeholder="Повторите новый пароль" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default ChangePassword
