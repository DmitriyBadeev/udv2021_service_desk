import React, { useState } from "react"
import { Drawer, Form, Button, Col, Row, Input, Space, message, Tooltip, Select } from "antd"
import { EditOutlined } from "@ant-design/icons"
import useEditProfileData, { EditUserData } from "hooks/useEditProfileData"
import { CUSTOMER_ROLE, OWNER_ROLE } from "helpers/roleHelper"

const { Option } = Select

type propTypes = {
    buttonSize?: "large" | "middle"
    name: string
    lastName: string
    patronymic: string
    email: string
    userId: string
    role: string
    buttonType?: "primary" | "link" | "circle"
    reload: () => void
}

const EditProfile: React.FC<propTypes> = ({
    buttonSize = "middle",
    buttonType = "primary",
    name,
    lastName,
    patronymic,
    email,
    userId,
    role,
    reload,
}) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const { query, loading } = useEditProfileData()

    const onFinish = (data: any) => {
        const editData: EditUserData = {
            Email: data.email,
            FirstName: data.firstName,
            LastName: data.lastName,
            Patronymic: data.patronymic,
            Role: data.role,
            UserId: userId,
        }

        query(editData, onSuccess, onError)
    }

    const onSuccess = (res: any) => {
        message.success("Профиль успешно изменен")
        reload()
        setVisible(false)
    }

    const onError = (error: any) => {
        if (error.response) {
            if (error.response.status === 401) {
                message.error("Нет прав доступа")

                return
            }
        }
        message.error("Произошла ошибка")
    }

    return (
        <>
            {buttonType === "circle" ? (
                <Tooltip title="Редактировать профиль">
                    <Button
                        type="link"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => setVisible(true)}
                        size={buttonSize}
                    />
                </Tooltip>
            ) : (
                <Button type={buttonType} onClick={() => setVisible(true)} size={buttonSize}>
                    <EditOutlined /> Редактировать профиль
                </Button>
            )}

            <Drawer
                title="Редактирование профиля"
                width={720}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ paddingBottom: 50 }}
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
                                name="lastName"
                                label="Фамилия"
                                rules={[{ required: true, message: "Введите фамилию" }]}
                                initialValue={lastName}
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
                                initialValue={name}
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
                                initialValue={patronymic}
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
                                initialValue={email}
                            >
                                <Input size="large" placeholder="Эл. почта пользователя" />
                            </Form.Item>
                        </Col>
                    </Row>
                    {(role === CUSTOMER_ROLE || role === OWNER_ROLE) && (
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="role"
                                    label="Роль"
                                    rules={[{ required: true, message: "Выберите роль" }]}
                                    initialValue={role}
                                >
                                    <Select size="large">
                                        <Option value={CUSTOMER_ROLE}>Представитель заказчика</Option>
                                        <Option value={OWNER_ROLE}>Владелец личного кабинета</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Drawer>
        </>
    )
}

export default EditProfile
