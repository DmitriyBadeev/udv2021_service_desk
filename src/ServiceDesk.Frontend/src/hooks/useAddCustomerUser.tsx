import { useState } from "react"
import axios from "axios"
import { BASE_IDENTITY_URL } from "store/Config"

export type RegistrationCustomerUserData = {
    Email: string
    LastName: string
    FirstName: string
    Patronymic: string
    Password: string
    Role: string
    ClientId: number
}

const useEditProfileData = () => {
    const token = window.localStorage.getItem("token")
    const [loading, setLoading] = useState(false)

    const query = (
        data: RegistrationCustomerUserData,
        onSuccess: (res: any) => void,
        onError: (error: any) => void
    ) => {
        setLoading(true)

        const identityApi = axios.create({
            baseURL: BASE_IDENTITY_URL,
            headers: {
                Authorization: token ? token : "",
            },
        })

        identityApi
            .post("/registration/customer", data)
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
