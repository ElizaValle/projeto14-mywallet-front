import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
 
export const UserContext = createContext() 

export default function UserProvider({ children }) {
    const localStorageUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(localStorageUser !== null ? localStorageUser : {})
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorageUser == null) {
            navigate("/")
        } else {
            navigate("/home")
        }
    }, [])

    return (
        <UserContext.Provider value = {{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )

}