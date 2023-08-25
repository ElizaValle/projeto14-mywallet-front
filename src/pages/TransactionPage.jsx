import { useContext, useEffect } from "react"
import styled from "styled-components"
import AuthContext from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function TransactionsPage() {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    if (!token) navigate("/")
    
  }, [])

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input placeholder="Valor" type="text"/>
        <input placeholder="Descrição" type="text" />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
