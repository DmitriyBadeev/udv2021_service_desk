import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message, Select } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import useAddCustomerUser, { RegistrationCustomerUserData } from "hooks/useAddCustomerUser"
import { CUSTOMER_ROLE, OWNER_ROLE } from "helpers/roleHelper"

const { Option } = Select

type propTypes = {
    buttonSize?: "large" | "middle"
    reload: () => void
    customerId: number
}

const AddUserCustomer: React.FC<propTypes> = ({ buttonSize = "middle", reload, customerId }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const { loading, query } = useAddCustomerUser()

    const onFinish = (data: any) => {
        const user: RegistrationCustomerUserData = {
            ClientId: customerId,
            Role: data.role,
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
                <PlusOutlined /> Добавить
            </Button>
            <Drawer
                title="Регистрация представителя заказчика"
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
                                name="role"
                                label="Роль"
                                rules={[{ required: true, message: "Выберите роль" }]}
                                initialValue={CUSTOMER_ROLE}
                            >
                                <Select size="large">
                                    <Option value={CUSTOMER_ROLE}>Представитель заказчика</Option>
                                    <Option value={OWNER_ROLE}>Владелец личного кабинета</Option>
                                </Select>
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

export default AddUserCustomer
