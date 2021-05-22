import React from "react"
import { Form, message, Select } from "antd"
import { useGetLicensesQuery } from "types"

const { Option } = Select

type propTypes = {
    initValues?: number[]
}

const LicensesSelectMany: React.FC<propTypes> = ({ initValues }) => {
    const { data, loading, error } = useGetLicensesQuery({ fetchPolicy: "no-cache" })

    if (error) message.error(error.message)

    const getOptions = () => {
        return data?.licenses
            ?.filter((license) => license?.clientId === null || initValues?.includes(license?.id || -1))
            .map((license) => {
                return (
                    <Option key={license?.id} value={license?.id || 0}>
                        {license?.software} ({license?.number})
                    </Option>
                )
            })
    }

    return (
        <Form.Item
            name="licenses"
            label="Лицензии"
            rules={[{ required: true, message: "Выберите лицензии" }]}
            initialValue={initValues}
        >
            <Select size="large" mode="multiple" loading={loading} placeholder="Выберите лицензии">
                {initValues && loading && <Option value={initValues[0]}>Загрузка...</Option>}
                {getOptions()}
            </Select>
        </Form.Item>
    )
}

export default LicensesSelectMany
