import { Col, Form, FormInstance, Row } from "antd"
import { H3, Text } from "GeneralStyles"
import React from "react"
import CustomerSelect from "components/selects/CustomerSelect"
import SoftwareSelect from "components/selects/SoftwareSelect"
import styled from "styled-components"

type propTypes = {
    filterHandler: () => void
    form: FormInstance<any>
}

const TitleContainer = styled(Row)`
    position: fixed;
    top: 100px;
    left: 20px;
    right: 20px;
`

const FiltersWrapper = styled(Row)``

const AppealsTitle = styled(H3)`
    margin: 0;
`

const KanbanFilters: React.FC<propTypes> = ({ filterHandler, form }) => {
    return (
        <TitleContainer justify="space-between">
            <Col>
                <AppealsTitle>Обращения</AppealsTitle>
            </Col>
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
        </TitleContainer>
    )
}

export default KanbanFilters
