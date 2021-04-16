import { useEffect, useState, useCallback } from "react"
import { BASE_IDENTITY_URL } from "store/Config"
import axios from "axios"

const useCustomerUsersData = (customerId: number) => {
    const token = window.localStorage.getItem("token")

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const reload = useCallback(() => {
        setLoading(true)

        const identityApi = axios.create({
            baseURL: BASE_IDENTITY_URL,
            headers: {
                Authorization: token ? token : "",
            },
        })

        identityApi
            .get("/customer", { params: { clientId: customerId } })
            .then((res) => {
                const data = res.data.map((u: any) => ({ key: u.userId, ...u }))
                setData(data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [setLoading, setData, token, customerId])

    useEffect(() => {
        reload()
    }, [reload])

    return { data, loading, reload }
}

export default useCustomerUsersData
