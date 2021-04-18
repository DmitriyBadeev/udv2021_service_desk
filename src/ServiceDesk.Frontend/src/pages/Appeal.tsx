import { Button, Col, Descriptions, Divider, Form, Row, Typography } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { Text } from "GeneralStyles"
import styled from "styled-components"
import TextArea from "antd/lib/input/TextArea"

type paramsTypes = {
    id: string
}

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

const Appeal: React.FC = () => {
    const { id } = useParams<paramsTypes>()

    const appealData = {
        id,
        theme: "Тема очень важного обращения",
        text:
            "Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, и занялся его поисками в классической латинской литературе.",
        creationDate: "21.04.2021",
        processingDate: "25.04.2021",
        developerRepresentativeId: "43cf386f-8024-4c5e-a012-d70eb0581d83",
        developerRepresentativeName: "Генадий Лебедев",
        status: "В работе",
        author: "Иванов Иван Иванович",
        authorId: "43cf386f-8024-4c5e-a012-d70eb0581d83",
        software: "Название ПО",
        softwareModule: "Название модуля ПО",
        comments: [
            {
                id: 1,
                text: "Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже.",
                author: "Генадий Лебедев",
                authorId: "43cf386f-8024-4c5e-a012-d70eb0581d83",
                creationDate: "21.04.2021",
            },
            {
                id: 2,
                text:
                    "Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.",
                author: "Иванов Иван",
                authorId: "43cf386f-8024-4c5e-a012-d70eb0581d83",
                creationDate: "21.04.2021",
            },
        ],
    }

    const onComment = (values: any) => {
        console.log(values.comment)
    }

    return (
        <FadePage>
            <Row justify="space-between" gutter={[24, 24]}>
                <Col span={14}>
                    <Card>
                        <CardHeader
                            title={appealData.theme}
                            size="small"
                            Form={(props) => (
                                <Button size={props.buttonSize} type="primary">
                                    Редактировать
                                </Button>
                            )}
                        />
                        <Paragraph>{appealData.text}</Paragraph>

                        <Divider />

                        <CommentContainer>
                            {appealData.comments.map((comment) => (
                                <Comment key={comment.id}>
                                    <Paragraph>
                                        <Link to={`/profile/${comment.authorId}`}>{comment.author}</Link>{" "}
                                        <Text $color="grey4">{comment.creationDate}</Text>
                                    </Paragraph>
                                    <Paragraph>{comment.text}</Paragraph>
                                </Comment>
                            ))}
                        </CommentContainer>
                        <Form layout="vertical" onFinish={onComment}>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="comment"
                                        rules={[{ required: true, message: "Комментарий не может быть пустым" }]}
                                    >
                                        <TextArea rows={5} placeholder="Комментарий"></TextArea>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType="submit" type="primary">
                                            Оставить комментарий
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col span={10}>
                    <Card isSecondary>
                        <Descriptions column={1} labelStyle={{ fontWeight: 600 }} size="small">
                            <Descriptions.Item label="Идентификатор">{appealData?.id}</Descriptions.Item>
                            <Descriptions.Item label="Статус">{appealData.status}</Descriptions.Item>
                            <Descriptions.Item label="Дата создания">{appealData.creationDate}</Descriptions.Item>
                            <Descriptions.Item label="Дата обработки">{appealData.processingDate}</Descriptions.Item>
                            <Descriptions.Item label="Автор">
                                <Link to={`/profile/${appealData.authorId}`}>{appealData.author}</Link>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ответственный разработчик">
                                <Link to={`/profile/${appealData.developerRepresentativeId}`}>
                                    {appealData.developerRepresentativeName}
                                </Link>
                            </Descriptions.Item>
                            <Descriptions.Item label="Название ПО">{appealData.software}</Descriptions.Item>
                            <Descriptions.Item label="Функциональный модуль ПО">
                                {appealData.softwareModule}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </FadePage>
    )
}

export default Appeal
