import React from "react"
import { Form, message, Select } from "antd"
import { useGetClientsQuery } from "types"

const { Option } = Select

type propTypes = {
    initValue?: number
}

const CustomerSelect: React.FC<propTypes> = ({ initValue }) => {
    const { data, loading, error } = useGetClientsQuery()

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
        <Form.Item name="clientId" label="Заказчик" initialValue={initValue}>
            <Select size="large" placeholder="Выберите заказчика" loading={loading} allowClear>
                {initValue && loading && <Option value={initValue}>Загрузка...</Option>}
                {getOptions()}
            </Select>
        </Form.Item>
    )
}

export default CustomerSelect
