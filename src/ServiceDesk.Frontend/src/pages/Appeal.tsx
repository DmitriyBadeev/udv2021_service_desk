import { Col, Descriptions, Divider, message, Row, Tag, Typography } from "antd"
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
                            <Descriptions.Item label="??????????????????????????">{appealData?.id}</Descriptions.Item>
                            <Descriptions.Item label="????????????">
                                <Tag color="geekblue">{appealData?.requestStatus}</Tag>{" "}
                            </Descriptions.Item>
                            <Descriptions.Item label="???????? ????????????????">
                                {getNumericStringDate(appealData?.creationDate)}
                            </Descriptions.Item>
                            <Descriptions.Item label="????????????????">
                                <Link to={`/cabinets/${appealData?.clientId}`}>{appealData?.clientName}</Link>
                            </Descriptions.Item>
                            <Descriptions.Item label="??????????">
                                <Link to={`/profile/${appealData?.authorId}`}>
                                    <UserName userId={appealData?.authorId || ""} />
                                </Link>
                            </Descriptions.Item>
                            {appealData?.developerRepresentativeId && (
                                <Descriptions.Item label="?????????????????????????? ??????????????????????">
                                    <Link to={`/profile/${appealData?.developerRepresentativeId}`}>
                                        {appealData.developerRepresentativeId}
                                    </Link>
                                </Descriptions.Item>
                            )}

                            <Descriptions.Item label="???????????????? ????">{appealData?.software || "???"}</Descriptions.Item>
                            <Descriptions.Item label="???????????????????????????? ???????????? ????">
                                {appealData?.softwareModule || "???"}
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
