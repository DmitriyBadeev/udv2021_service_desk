import React, { useState } from "react"
import { Drawer, Form, Col, Row, Button, Input, Space, message } from "antd"
import useAddDeveloperUser, { RegistrationDeveloperUserData } from "hooks/useAddDeveloperUser"
import { PlusOutlined } from "@ant-design/icons"

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
}

const AddUserDeveloper: React.FC<propTypes> = ({ buttonSize, reload }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const { loading, query } = useAddDeveloperUser()

    const onFinish = (data: any) => {
        const user: RegistrationDeveloperUserData = {
            Email: data.email,
            FirstName: data.firstName,
            LastName: data.lastName,
            Patronymic: data.patronymic,
            Password: data.password,
        }

        query(user, onSuccess, onError)
    }

    const onSuccess = (res: any) => {
        message.success("Пользователь успешно создан")
        reload()
        setVisible(false)
    }

    const onError = (error: any) => {
        if (error.response) {
            message.error(error.response.data[0].description)
        }
    }

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)} size={buttonSize}>
                <PlusOutlined /> Добавить разработчика
            </Button>
            <Drawer
                title="Регистрация представителя разработчика"
                width={720}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space size="large" style={{ padding: "5px 15px" }}>
                        <Button onClick={() => form.submit()} type="primary" size="large" loading={loading}>
                            Зарегистрировать
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
                                name="lastName"
                                label="Фамилия"
                                rules={[{ required: true, message: "Введите фамилию" }]}
                            >
                                <Input size="large" placeholder="Фамилия пользователя" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="firstName"
                                label="Имя"
                                rules={[{ required: true, message: "Введите имя" }]}
                            >
                                <Input size="large" placeholder="Имя пользователя" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="patronymic"
                                label="Отчество"
                                rules={[{ required: true, message: "Введите отчество" }]}
                            >
                                <Input size="large" placeholder="Отчество пользователя" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                label="Эл. почта"
                                rules={[{ required: true, message: "Введите эл. почту" }]}
                            >
                                <Input size="large" placeholder="Эл. почта пользователя" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="password"
                                label="Пароль"
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

export default AddUserDeveloper
