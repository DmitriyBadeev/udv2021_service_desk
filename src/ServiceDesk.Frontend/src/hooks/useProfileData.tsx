import { useEffect, useState } from "react"
import axios from "axios"

const useProfileData = () => {
    const token = window.localStorage.getItem("token")

    const identityApi = axios.create({
        baseURL: "https://identity-desk.badeev.info",
        headers: {
            Authorization: token ? token : "",
        },
    })

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        identityApi
            .get("/connect/userinfo")
            .then((res) => {
                setData(res.data)
                setLoading(false)
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [identityApi])

    return { data, loading }
}

export default useProfileData
