import { useEffect, useState, useCallback } from "react"
import { BASE_IDENTITY_URL } from "store/Config"
import axios from "axios"

const useGetAllUsers = () => {
    const token = window.localStorage.getItem("token")

    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState(true)

    const reload = useCallback(() => {
        setLoading(true)

        const identityApi = axios.create({
            baseURL: BASE_IDENTITY_URL,
            headers: {
                Authorization: token ? token : "",
            },
        })

        identityApi
            .get("/profile/all")
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [setLoading, setData, token])

    useEffect(() => {
        reload()
    }, [reload])

    return { data, loading, reload }
}

export default useGetAllUsers
