import { useContext, useState } from "react"
import styled from "styled-components"
import apiOperations from "../services/apiOperations"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export default function TransactionsPage({ operations, getOperationsList }) {
  const [form, setForm] = useState({ value: "", description: "" })
  const { user } = useContext(UserContext)
  const { type } = useParams()
  let typeOperation = type
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleOperation(e) {
    e.preventDefaul()

    apiOperations.createOperations(user.token, form)
    .then(res => {

      if(type === "entrada") {
        typeOperation = "Entrada"
      } else {
        typeOperation = "Saída"
      }
      
      setForm({ ...form, type: type === "entrada" ? "income" : "expense" })
      getOperationsList()
      navigate("/home")})
    .catch(err => alert(err.response.data.message))
  }

  return (
    <TransactionsContainer>
      <h1>Nova {typeOperation}</h1>
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
        <button type="submit">Salvar {typeOperation}</button>
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
