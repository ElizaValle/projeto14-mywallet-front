import { createContext, useState } from "react"

export const TransactionContext = createContext() 

export default function TransactionProvider({ children }) {
    const [operation, setOperation] = useState(0)

    return (
        <TransactionContext.Provider value={{ operation, setOperation }}>
            { children }
        </TransactionContext.Provider>
    )
}