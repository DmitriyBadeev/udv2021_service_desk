import { Button, Col, Row } from "antd"
import { H2, H3 } from "GeneralStyles"
import React from "react"
import styled from "styled-components"

type propTypes = {
    title: string
    buttonText: string
    size?: "default" | "small"
}

const HeaderContainer = styled(Row)`
    margin-bottom: 10px;
`

const CardHeader: React.FC<propTypes> = ({
    title,
    buttonText,
    size = "default",
}) => {
    const Title = size === "default" ? H2 : H3
    const buttonSize = size === "default" ? "large" : "middle"

    return (
        <HeaderContainer justify="space-between">
            <Col>
                <Title>{title}</Title>
            </Col>
            <Col>
                <Button type="primary" size={buttonSize}>
                    {buttonText}
                </Button>
            </Col>
        </HeaderContainer>
    )
}

export default CardHeader
