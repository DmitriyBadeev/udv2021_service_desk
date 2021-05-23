import React, { useState } from "react"
import { Form, message, Select } from "antd"
import { useGetSoftwaresQuery } from "types"

const { Option } = Select

type propTypes = {
    onChange?: (value: number) => void
    initValue?: number
    label?: string | null
    removable?: boolean
    size?: "large" | "middle" | "small"
    placeholder?: string
}

const SoftwareSelect: React.FC<propTypes> = ({
    onChange,
    initValue,
    removable,
    size = "large",
    label = "Название ПО",
    placeholder = "Выберите ПО",
}) => {
    const { data, loading, error } = useGetSoftwaresQuery({ fetchPolicy: "no-cache" })
    const [value, setValue] = useState(initValue)

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
        <Form.Item
            name="softwareId"
            initialValue={initValue}
            label={label}
            onReset={() => setValue(undefined)}
            rules={[{ required: !removable, message: "Выберите ПО" }]}
        >
            <Select
                size={size}
                placeholder={placeholder}
                loading={loading}
                style={{ minWidth: "200px" }}
                onChange={(v) => {
                    if (onChange && v) {
                        setValue(Number.parseInt(v.toString()))
                        onChange(Number.parseInt(v.toString()))
                    }
                }}
                allowClear={removable}
                value={value}
            >
                {initValue && loading && <Option value={initValue}>Загрузка...</Option>}
                {getOptions()}
            </Select>
        </Form.Item>
    )
}

export default SoftwareSelect
