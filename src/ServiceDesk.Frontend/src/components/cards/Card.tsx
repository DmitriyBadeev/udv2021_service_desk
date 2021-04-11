import React from "react"
import styled from "styled-components"

type propTypes = {
    isSecondary?: boolean
}

const CardWrapper = styled.div<propTypes>`
    background: ${(props) => props.theme.white};
    box-shadow: 0 4px ${(props) => (props.isSecondary ? "3px" : "10px")}
        rgba(0, 0, 0, 0.05);
    padding: 20px 30px;
    border-radius: 2px;
    margin-bottom: 40px;
`

const Card: React.FC<propTypes> = (props) => {
    return (
        <CardWrapper isSecondary={props.isSecondary}>
            {props.children}
        </CardWrapper>
    )
}

export default Card
