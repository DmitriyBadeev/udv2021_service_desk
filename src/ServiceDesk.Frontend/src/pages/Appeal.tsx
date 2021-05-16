import { Col, Descriptions, Divider, message, Row, Typography } from "antd"
import Card from "components/cards/Card"
import CardHeader from "components/cards/CardHeader"
import FadePage from "components/fade/FadePage"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { getNumericStringDate } from "helpers/dateHelpers"
import { useGetRequestQuery } from "types"
import UserName from "components/etc/UserName"
import EditAppeal from "components/forms/EditAppeal"
import Loading from "components/loading/Loading"
import AppealComments from "components/appeals/AppealComments"
import AppealAttachments from "components/appeals/AppealAttachments"

type paramsTypes = {
    id: string
}

const { Paragraph } = Typography

const Appeal: React.FC = () => {
    const { id } = useParams<paramsTypes>()
    const { data, loading, error, refetch } = useGetRequestQuery({ variables: { id }, fetchPolicy: "no-cache" })
    const appealData = data?.request

    if (loading) return <Loading height="70vh" size="big" />
    if (error) message.error(error.message)

    return (
        <FadePage>
            <Row justify="space-between" gutter={[24, 24]}>
                <Col span={14}>
                    <Card>
                        <CardHeader
                            title={appealData?.theme || ""}
                            size="small"
                            Form={() => (
                                <EditAppeal
                                    buttonSize="middle"
                                    id={appealData?.id}
                                    theme={appealData?.theme || ""}
                                    text={appealData?.text || ""}
                                    customerId={appealData?.clientId || -1}
                                    moduleId={appealData?.softwareModuleId ?? undefined}
                                    softwareId={appealData?.softwareId ?? undefined}
                                    type="primary"
                                    reload={() => refetch()}
                                />
                            )}
                        />
                        <Paragraph>{appealData?.text}</Paragraph>

                        <Divider />
                        <AppealComments requestId={id} />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card isSecondary marginBottom={20}>
                        <Descriptions column={1} labelStyle={{ fontWeight: 600 }} size="small">
                            <Descriptions.Item label="Идентификатор">{appealData?.id}</Descriptions.Item>
                            <Descriptions.Item label="Статус">{appealData?.requestStatus}</Descriptions.Item>
                            <Descriptions.Item label="Дата создания">
                                {getNumericStringDate(appealData?.creationDate)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Автор">
                                <Link to={`/profile/${appealData?.authorId}`}>
                                    <UserName userId={appealData?.authorId || ""} />
                                </Link>
                            </Descriptions.Item>
                            {appealData?.developerRepresentativeId && (
                                <Descriptions.Item label="Ответственный разработчик">
                                    <Link to={`/profile/${appealData?.developerRepresentativeId}`}>
                                        {appealData.developerRepresentativeId}
                                    </Link>
                                </Descriptions.Item>
                            )}

                            <Descriptions.Item label="Название ПО">{appealData?.software || "—"}</Descriptions.Item>
                            <Descriptions.Item label="Функциональный модуль ПО">
                                {appealData?.softwareModule || "—"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <AppealAttachments appealId={id} />
                </Col>
            </Row>
        </FadePage>
    )
}

export default Appeal
