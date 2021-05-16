import React from "react"
import { message, Select } from "antd"
import { useGetClientsQuery } from "types"

const { Option } = Select

type propTypes = {
    onChange?: (value: number) => void
    initValue?: number
}

const CustomerSelect: React.FC<propTypes> = ({ onChange, initValue }) => {
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
        <Select
            size="large"
            placeholder="Выберите заказчика"
            loading={loading}
            onChange={(value) => onChange && onChange(Number.parseInt(value.toString()))}
            defaultValue={initValue}
        >
            {initValue && loading && <Option value={initValue}>Загрузка...</Option>}
            {getOptions()}
        </Select>
    )
}

export default CustomerSelect
