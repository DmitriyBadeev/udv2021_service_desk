import { Button, Col, Form, message, Row, Space, Typography } from "antd"
import TextArea from "antd/lib/input/TextArea"
import Loading from "components/loading/Loading"
import React from "react"
import styled from "styled-components"
import { useGetAppealCommentsQuery, useCreateCommentMutation } from "types"
import { Text } from "GeneralStyles"
import { Link } from "react-router-dom"
import UserName from "components/etc/UserName"
import { getNumericStringDate } from "helpers/dateHelpers"

const { Paragraph } = Typography

const CommentContainer = styled.div`
    margin-bottom: 30px;
`

const Comment = styled.div`
    padding: 10px;
    border: 1px solid ${(props) => props.theme.grey6};
    border-radius: 2px;
    margin: 10px 0;
    transition: all 0.3s;

    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
    }
`

type propTypes = {
    requestId: string
}

const AppealComments: React.FC<propTypes> = ({ requestId }) => {
    const { data, loading, error, refetch } = useGetAppealCommentsQuery({ variables: { requestId } })
    const [query, mutationPayloads] = useCreateCommentMutation()

    const [form] = Form.useForm()

    if (loading) return <Loading />
    if (error) message.error(error.message)

    const comments = data?.requestComments || []

    const onComment = (values: any) => {
        form.resetFields()
        query({
            variables: {
                appealId: requestId,
                text: values.comment,
            },
        })
            .then(() => {
                message.success("Комментарий успешно оставлен")
                refetch()
            })
            .catch(() => {
                console.log(error)
                message.error("Произошла ошибка")
            })
    }

    return (
        <>
            <CommentContainer>
                {comments.map((comment) => (
                    <Comment key={comment?.id}>
                        <Paragraph>
                            <Space>
                                <Link to={`/profile/${comment?.authorId}`}>
                                    <UserName userId={comment?.authorId || ""} />
                                </Link>
                                <Text $color="grey4">{getNumericStringDate(comment?.creationDate)}</Text>
                            </Space>
                        </Paragraph>
                        <Paragraph>{comment?.text}</Paragraph>
                    </Comment>
                ))}
            </CommentContainer>
            <Form layout="vertical" onFinish={onComment} form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="comment"
                            rules={[{ required: true, message: "Комментарий не может быть пустым" }]}
                        >
                            <TextArea rows={5} placeholder="Комментарий"></TextArea>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" loading={mutationPayloads.loading}>
                                Оставить комментарий
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default AppealComments
