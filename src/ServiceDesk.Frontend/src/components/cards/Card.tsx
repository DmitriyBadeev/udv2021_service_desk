import React from "react"
import styled from "styled-components"

type propTypes = {
    isSecondary?: boolean
    marginBottom?: number
}

const CardWrapper = styled.div<propTypes>`
    background: ${(props) => props.theme.white};
    box-shadow: 0 4px ${(props) => (props.isSecondary ? "3px" : "10px")} rgba(0, 0, 0, 0.05);
    padding: 20px 30px;
    border-radius: 2px;
    margin-bottom: ${(props) => `${props.marginBottom}px`};
`

const Card: React.FC<propTypes> = ({ isSecondary, marginBottom = 40, children }) => {
    return (
        <CardWrapper isSecondary={isSecondary} marginBottom={marginBottom}>
            {children}
        </CardWrapper>
    )
}

export default Card
