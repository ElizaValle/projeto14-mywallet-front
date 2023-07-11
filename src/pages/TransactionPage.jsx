import { useContext, useState } from "react"
import styled from "styled-components"
import apiOperations from "../services/apiOperations"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export default function TransactionsPage({ getOperationsList }) {
  const [form, setForm] = useState({ value: "", description: "" })
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleOperation(e) {
    e.preventDefaul()

    apiOperations.createOperations(user.token, form)
    .then(res => {
      setForm({value: "", description: ""})
      getOperationsList()
      navigate("/home")})
    .catch(err => alert(err.response.data.message))
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleOperation}>
        <input 
          name="value" 
          placeholder="Valor" 
          type="text" 
          value={form.value} 
          onChange={handleForm} 
          required
        />
        <input 
          name="description" 
          placeholder="Descrição" 
          type="text" 
          value={form.description} 
          onChange={handleForm} 
          required
        />
        <button type="submit">Salvar TRANSAÇÃO</button>
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
