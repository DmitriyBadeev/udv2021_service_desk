import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { v4 as uuid } from "uuid"
import { Row, Col, Typography } from "antd"
import styled from "styled-components"
import { SmallText } from "GeneralStyles"
import { Link } from "react-router-dom"

const { Paragraph } = Typography

const columnsFromBackend = {
    [uuid()]: {
        name: "Новые",
        items: [
            { id: uuid(), theme: "Обращение №1", author: "Иванов И. И.", Software: "Название ПО" },
            { id: uuid(), theme: "Обращение №2", author: "Иванов И. И.", Software: "Название ПО" },
            { id: uuid(), theme: "Обращение №5", author: "Иванов И. И.", Software: "Название ПО" },
        ],
    },
    [uuid()]: {
        name: "Зарегистрированные",
        items: [
            {
                id: uuid(),
                theme: "Одно очень длинное обращение, которое, при всем желании, не помещается в карточку",
                author: "Иванов И. И.",
                Software: "Название ПО",
            },
            { id: uuid(), theme: "Обращение №7", author: "Иванов И. И.", Software: "Название ПО" },
            { id: uuid(), theme: "Обращение №8", author: "Иванов И. И.", Software: "Название ПО" },
        ],
    },
    [uuid()]: {
        name: "В работе",
        items: [{ id: uuid(), theme: "Обращение №3", author: "Иванов И. И.", Software: "Название ПО" }],
    },
    [uuid()]: {
        name: "Переоткрытые",
        items: [],
    },
    [uuid()]: {
        name: "Отклоненные",
        items: [],
    },
    [uuid()]: {
        name: "Закрытые",
        items: [{ id: uuid(), theme: "Обращение №9", author: "Иванов И. И.", Software: "Название ПО" }],
    },
}

const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        })
    } else {
        const column = columns[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        })
    }
}

const HeaderColumn = styled.div`
    background: ${(props) => props.theme.white};
    padding: 8px 16px;
    border-radius: 5px 5px 0 0;
`

const Column = styled.div<{ isDraggingOver: boolean }>`
    background: ${(props) => (props.isDraggingOver ? props.theme.grey5 : props.theme.grey5)};
    border-radius: 2px;
    padding: 12px 7px;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: ${(props) => props.isDraggingOver && props.theme.inputShadowFocus};
`

const Card = styled.div<{ isDragging: boolean }>`
    background: ${(props) => (props.isDragging ? props.theme.white : props.theme.white)};
    border-radius: 3px;
    padding: 8px;
    transition: all 0.3s;
    user-select: none;
    margin-bottom: 6px;
    min-height: 80px;

    &:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    }
`

const Number = styled.div`
    background: ${(props) => props.theme.grey6};
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 12px;
    width: 18px;
    height: 18px;
`

const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState(columnsFromBackend)
    console.log(columns)

    return (
        <Row gutter={[12, 12]}>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <Col span={4} key={columnId}>
                            <HeaderColumn>
                                <SmallText $bold>
                                    <Number>{column.items.length}</Number> {column.name}
                                </SmallText>
                            </HeaderColumn>

                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided, snapshot) => {
                                    return (
                                        <Column
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            isDraggingOver={snapshot.isDraggingOver}
                                        >
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <Card
                                                                    isDragging={snapshot.isDragging}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        ...provided.draggableProps.style,
                                                                    }}
                                                                >
                                                                    <SmallText $color="grey3">
                                                                        #{item.Software}
                                                                    </SmallText>
                                                                    <br />

                                                                    <Paragraph
                                                                        ellipsis={{
                                                                            rows: 3,
                                                                            expandable: false,
                                                                        }}
                                                                        strong
                                                                        title={item.theme}
                                                                        style={{ marginBottom: 5 }}
                                                                    >
                                                                        <Link to={`/appeals/${item.id}`}>
                                                                            {item.theme}
                                                                        </Link>
                                                                    </Paragraph>

                                                                    <SmallText $color="grey2">{item.author}</SmallText>
                                                                </Card>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </Column>
                                    )
                                }}
                            </Droppable>
                        </Col>
                    )
                })}
            </DragDropContext>
        </Row>
    )
}

export default KanbanBoard
