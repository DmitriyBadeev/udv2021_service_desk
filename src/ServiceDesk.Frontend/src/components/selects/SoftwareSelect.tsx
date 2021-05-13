import React from "react"
import { message, Select } from "antd"
import { useGetSoftwaresQuery } from "types"

const { Option } = Select

type propTypes = {
    onChange?: (value: number) => void
}

const SoftwareSelect: React.FC<propTypes> = ({ onChange }) => {
    const { data, loading, error } = useGetSoftwaresQuery()

    if (error) message.error(error.message)

    const getOptions = () => {
        return data?.softwares?.map((software) => {
            return (
                <Option key={software?.id} value={software?.id || 0}>
                    {software?.title}
                </Option>
            )
        })
    }

    return (
        <Select
            size="large"
            placeholder="Выберите ПО"
            loading={loading}
            onChange={(value) => onChange && onChange(Number.parseInt(value.toString()))}
        >
            {getOptions()}
        </Select>
    )
}

export default SoftwareSelect
