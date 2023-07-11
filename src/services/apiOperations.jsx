import axios from "axios"

function createConfig(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

function getOperations(token) {
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/operation`, createConfig(token))
    return promise
}

function createOperations(token, body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/operation`, body, createConfig(token))
    return promise
}

const apiOperations = { getOperations, createOperations }
export default apiOperations