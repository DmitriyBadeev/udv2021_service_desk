import { useState } from "react"
import axios from "axios"
import { BASE_IDENTITY_URL } from "store/Config"

export type EditUserData = {
    UserId: string
    FirstName: string
    LastName: string
    Patronymic: string
    Role: string
    Email: string
}

const useEditProfileData = () => {
    const token = window.localStorage.getItem("token")
    const [loading, setLoading] = useState(false)

    const query = (editData: EditUserData, onSuccess: (res: any) => void, onError: (error: any) => void) => {
        setLoading(true)

        const identityApi = axios.create({
            baseURL: BASE_IDENTITY_URL,
            headers: {
                Authorization: token ? token : "",
            },
        })

        identityApi
            .post("/profile", editData)
            .then((res) => {
                onSuccess(res)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                onError(error)
                setLoading(false)
            })
    }

    return { query, loading }
}

export default useEditProfileData
