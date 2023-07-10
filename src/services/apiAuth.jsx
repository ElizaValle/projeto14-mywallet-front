import axios from "axios"

function singUp(body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, body)
    return promise
}

function signIn(body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, body)
    return promise
}

const apiAuth = { signIn, singUp }
export default apiAuth