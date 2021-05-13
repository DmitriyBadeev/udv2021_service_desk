import React from "react"
import { message, Select } from "antd"
import { useGetClientsQuery } from "types"

const { Option } = Select

type propTypes = {
    onChange?: (value: number) => void
}

const CustomerSelect: React.FC<propTypes> = ({ onChange }) => {
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
        >
            {getOptions()}
        </Select>
    )
}

export default CustomerSelect
