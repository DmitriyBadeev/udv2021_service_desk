import React from "react"
import { Form, message, Select } from "antd"
import { useGetClientsQuery } from "types"

const { Option } = Select

type propTypes = {
    initValue?: number
    size?: "large" | "middle" | "small"
    label?: string | null
    placeholder?: string
}

const CustomerSelect: React.FC<propTypes> = ({
    initValue,
    size = "large",
    label = "Заказчик",
    placeholder = "Выберите заказчика",
}) => {
    const { data, loading, error } = useGetClientsQuery({ fetchPolicy: "no-cache" })

    if (error) message.error(error.message)

    const getOptions = () => {
        return data?.clients?.map((client) => {
            return (
                <Option key={client?.id} value={client?.id || 0}>
                    {client?.name}
                </Option>
            )
        })
    }

    return (
        <Form.Item name="clientId" label={label} initialValue={initValue}>
            <Select size={size} placeholder={placeholder} loading={loading} style={{ minWidth: "200px" }} allowClear>
                {initValue && loading && <Option value={initValue}>Загрузка...</Option>}
                {getOptions()}
            </Select>
        </Form.Item>
    )
}

export default CustomerSelect
