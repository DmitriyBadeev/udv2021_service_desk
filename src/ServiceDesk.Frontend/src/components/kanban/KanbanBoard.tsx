import React, { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Typography, message, Form, Space, Tag } from "antd"
import styled from "styled-components"
import { SmallText } from "GeneralStyles"
import { Link } from "react-router-dom"
import {
    useRequestBoardsQuery,
    useToRegistrationStatusMutation,
    useToNewStatusMutation,
    useToWorkStatusMutation,
    useToRejectStatusMutation,
    useToClosingStatusMutation,
    useToReopenStatusMutation,
} from "types"
import Loading from "components/loading/Loading"
import KanbanFilters from "components/kanban/KanbanFilters"
import { ExclamationCircleOutlined } from "@ant-design/icons"

const { Paragraph } = Typography

const CardIcon = styled(ExclamationCircleOutlined)`
    color: ${(props) => props.theme.linkColor};
`

const PageContainer = styled.div`
    margin: 50px -40px -40px -40px;
    background: ${(props) => props.theme.white};
`

const BoardContainer = styled.div`
    display: flex;
    width: 1750px;
    background: ${(props) => props.theme.white};
    border-top: 1px solid rgba(0, 0, 0, 0.05);

    padding: 0 5px;
`

const ColumnWrapper = styled.div`
    width: 280px;
    margin: 20px 5px 0;
    flex-shrink: 0;
`

const HeaderColumn = styled.div`
    background: ${(props) => props.theme.white};
    padding: 8px 16px;
    border-radius: 5px 5px 0 0;
    border: solid 1px rgba(0, 0, 0, 0.1);
`

const Column = styled.div<{ isDraggingOver: boolean }>`
    background: ${(props) => (props.isDraggingOver ? props.theme.inputShadowColor : props.theme.primaryGray)};
    padding: 12px 7px;
    height: calc(100vh - 230px);
    overflow-y: auto;
    overflow-x: hidden;
    border-left: solid 1px rgba(0, 0, 0, 0.05);
    border-right: solid 1px rgba(0, 0, 0, 0.05);
`

const Card = styled.div<{ isDragging: boolean }>`
    background: ${(props) => (props.isDragging ? props.theme.white : props.theme.white)};
    border-radius: 3px;
    padding: 8px;
    user-select: none;
    margin: 0 0 6px 0;
    border: solid 1px rgba(0, 0, 0, 0.2);

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

const TagsContainer = styled.div`
    margin: 5px 0;
`

const KanbanBoard: React.FC = () => {
    const { data, loading, error, refetch } = useRequestBoardsQuery({
        fetchPolicy: "no-cache",
    })
    const [columns, setColumns] = useState(data?.requestBoards)

    const [toNew] = useToNewStatusMutation()
    const [toRegistration] = useToRegistrationStatusMutation()
    const [toWork] = useToWorkStatusMutation()
    const [toReject] = useToRejectStatusMutation()
    const [toClosing] = useToClosingStatusMutation()
    const [toReopen] = useToReopenStatusMutation()

    useEffect(() => {
        setColumns(data?.requestBoards)
    }, [data, setColumns])

    const [form] = Form.useForm()

    if (loading) return <Loading height="70vh" size="big" />
    if (error) message.error(error.message)

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

            sendRequestToServer(destination.droppableId, removed)
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

    const sendRequestToServer = (columnId: any, appeal: any) => {
        if (columnId === "0") toNew({ variables: { id: appeal.id } })
        if (columnId === "1") toRegistration({ variables: { id: appeal.id } })
        if (columnId === "2") toWork({ variables: { id: appeal.id } })
        if (columnId === "3") toReopen({ variables: { id: appeal.id } })
        if (columnId === "4") toReject({ variables: { id: appeal.id } })
        if (columnId === "5") toClosing({ variables: { id: appeal.id } })
    }

    const filterHandler = () => {
        const values = form.getFieldsValue()

        refetch({
            authorId: null,
            clientId: values.clientId ? values.clientId : null,
            developerRepresentativeId: null,
            softwareId: values.softwareId ? values.softwareId : null,
        })
    }

    return (
        <PageContainer>
            <KanbanFilters filterHandler={filterHandler} form={form} />
            <BoardContainer>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns || {}).map(([columnId, column]) => {
                        return (
                            <ColumnWrapper key={columnId}>
                                <HeaderColumn>
                                    <SmallText $bold>
                                        <Number>{column?.items?.length || 0}</Number> {column?.name}
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
                                                {column?.items?.map((item, index) => {
                                                    return (
                                                        <Draggable key={item?.id} draggableId={item?.id} index={index}>
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
                                                                        <Space align="start">
                                                                            <CardIcon />
                                                                            <div>
                                                                                <Paragraph
                                                                                    ellipsis={{
                                                                                        rows: 3,
                                                                                        expandable: false,
                                                                                    }}
                                                                                    strong
                                                                                    title={item?.theme ?? ""}
                                                                                    style={{ marginBottom: 2 }}
                                                                                >
                                                                                    <Link to={`/appeals/${item?.id}`}>
                                                                                        {item?.theme}
                                                                                    </Link>
                                                                                </Paragraph>

                                                                                <SmallText $color="grey3">
                                                                                    {item?.clientName}
                                                                                </SmallText>

                                                                                <TagsContainer>
                                                                                    {item?.software && (
                                                                                        <Tag color="purple">
                                                                                            {item?.software}
                                                                                        </Tag>
                                                                                    )}
                                                                                </TagsContainer>
                                                                            </div>
                                                                        </Space>
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
                            </ColumnWrapper>
                        )
                    })}
                </DragDropContext>
            </BoardContainer>
        </PageContainer>
    )
}

export default KanbanBoard
