import { Col, Form, FormInstance, Row } from "antd"
import { Text } from "GeneralStyles"
import React from "react"
import CustomerSelect from "components/selects/CustomerSelect"
import SoftwareSelect from "components/selects/SoftwareSelect"
import styled from "styled-components"

type propTypes = {
    filterHandler: () => void
    form: FormInstance<any>
}

const FiltersWrapper = styled(Row)`
    position: fixed;
    top: 100px;
    left: 20px;
`

const KanbanFilters: React.FC<propTypes> = ({ filterHandler, form }) => {
    return (
        <FiltersWrapper gutter={[12, 12]} align="middle">
            <Col>
                <Text>Фильтры:</Text>
            </Col>
            <Col>
                <Form layout="inline" onValuesChange={filterHandler} form={form}>
                    <CustomerSelect size="middle" label={null} placeholder="По заказчику" />
                    <SoftwareSelect removable size="middle" label={null} placeholder="По названию ПО" />
                </Form>
            </Col>
        </FiltersWrapper>
    )
}

export default KanbanFilters
