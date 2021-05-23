import { Col, Row } from "antd"
import { H2, H3 } from "GeneralStyles"
import React from "react"
import styled from "styled-components"

type propTypes = {
    title: string
    Form: React.FC<{ buttonSize?: "large" | "middle" }>
    size?: "default" | "small"
}

const HeaderContainer = styled(Row)`
    margin-bottom: 10px;
`

const CardHeader: React.FC<propTypes> = ({ title, Form, size = "default" }) => {
    const Title = size === "default" ? H2 : H3
    const buttonSize = size === "default" ? "large" : "middle"

    return (
        <HeaderContainer justify="space-between">
            <Col span={16}>
                <Title>{title}</Title>
            </Col>
            <Col>
                <Form buttonSize={buttonSize} />
            </Col>
        </HeaderContainer>
    )
}

export default CardHeader
