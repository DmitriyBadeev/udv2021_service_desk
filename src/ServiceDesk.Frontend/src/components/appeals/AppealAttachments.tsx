import { Button, Descriptions, message, Upload } from "antd"
import Card from "components/cards/Card"
import Loading from "components/loading/Loading"
import React from "react"
import { UploadOutlined } from "@ant-design/icons"
import { useGetRequestAttachmentsQuery, useAttachMutation, useDeleteAttachMutation } from "types"
import { BASE_FILE_SERVER_URL } from "store/Config"
import { RcFile } from "antd/lib/upload/interface"

type propTypes = {
    appealId: string
}

const AppealAttachments: React.FC<propTypes> = ({ appealId }) => {
    const { data, loading, error, refetch } = useGetRequestAttachmentsQuery({ variables: { requestId: appealId } })
    const [attachQuery, attachPayloads] = useAttachMutation()
    const [deleteAttachQuery] = useDeleteAttachMutation()

    const onFileLoad = (file: any) => {
        attachQuery({
            variables: {
                id: appealId,
                file: file,
            },
        })
            .then(() => {
                message.success("Файл прикреплен")
                refetch()
            })
            .catch((error) => {
                console.log(error)

                message.error("Ошибка при загрузке файла")
            })
    }

    const onFileRemove = (file: any) => {
        const attachId = Number.parseInt(file.uid)

        deleteAttachQuery({ variables: { attachId } })
            .then(() => {
                message.success("Файл удален")
                refetch()
            })
            .catch((error) => {
                console.log(error)

                message.error("Ошибка при удалении файла")
            })
    }

    if (loading)
        return (
            <Card>
                <Loading />
            </Card>
        )

    if (error) message.error(error.message)

    return (
        <Card>
            <Descriptions column={1} labelStyle={{ fontWeight: 600 }} size="small">
                <Descriptions.Item label="Вложения">
                    <Upload
                        beforeUpload={(file) => {
                            onFileLoad(file)
                            return false
                        }}
                        fileList={data?.requestAttachments?.map((attach) => ({
                            name: attach?.name || "",
                            size: Number.parseFloat(attach?.sizeMb || "") * 1024 * 1024 * 8,
                            type: "file",
                            uid: attach?.id.toString() || "",
                            originFileObj: {} as RcFile,
                            url: `${BASE_FILE_SERVER_URL}/${attach?.reference}`,
                        }))}
                        onRemove={(file) => onFileRemove(file)}
                    >
                        <Button icon={<UploadOutlined />} size="small" loading={attachPayloads.loading}>
                            Загрузить файл
                        </Button>
                    </Upload>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default AppealAttachments
