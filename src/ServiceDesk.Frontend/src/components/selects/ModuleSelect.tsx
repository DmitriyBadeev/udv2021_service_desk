import React, { useState } from "react"
import { Form, message, Select } from "antd"
import { useGetModulesQuery } from "types"

const { Option } = Select

type propTypes = {
    onChange?: (value: number) => void
    initValue?: number
    disabled?: boolean
    softwareId?: number
    removable?: boolean
}

const ModuleSelect: React.FC<propTypes> = ({
    onChange,
    initValue,
    disabled = false,
    softwareId,
    removable = false,
}) => {
    const { data, loading, error } = useGetModulesQuery()
    const [value, setValue] = useState(initValue)

    if (error) message.error(error.message)

    const getOptions = () => {
        return data?.softwareModules
            ?.filter((sm) => sm?.softwareId === softwareId)
            .map((module) => {
                return (
                    <Option key={module?.id} value={module?.id || 0}>
                        {module?.title}
                    </Option>
                )
            })
    }

    return (
        <Form.Item
            name="moduleId"
            label="Функциональный модуль ПО"
            initialValue={initValue}
            onReset={() => setValue(undefined)}
        >
            <Select
                size="large"
                placeholder="Выберите модуль ПО"
                loading={loading}
                onChange={(v) => {
                    if (onChange && v) {
                        setValue(Number.parseInt(v.toString()))
                        onChange(Number.parseInt(v.toString()))
                    }
                }}
                disabled={disabled}
                allowClear={removable}
                value={value}
            >
                {initValue && loading && <Option value={initValue}>Загрузка...</Option>}
                {getOptions()}
            </Select>
        </Form.Item>
    )
}

export default ModuleSelect
