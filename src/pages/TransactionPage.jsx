import { useContext, useEffect } from "react"
import styled from "styled-components"
import AuthContext from "../contexts/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function TransactionsPage() {
  const [form, setForm] = useState({ valor: "", descricao: "" })
  const { tipo } = useParams()
  const transacao = tipo === "entrada" ? "Entrada" : "Saída"
  const { token } = useContext(AuthContext)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleTransaction(e) {
    e.preventDefault()
    const body = { ...form, tipo: tipo === "entrada" ? "proventos" : "despesas" }

    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao`, body, config)
      .then(res => navigate("/home"))
      .catch(err => alert(err.response.data))
  }

  return (
    <TransactionsContainer>
      <h1>Nova {transacao}</h1>
      <form onSubmit={handleTransaction}>
        <input
          name="valor" 
          placeholder="Valor" 
          type="text"
          value={form.valor}
          onChange={handleForm}
          required
          data-test="registry-amount-input"
        />
        <input 
          name="descricao"
          placeholder="Descrição" 
          type="text" 
          value={form.descricao}
          onChange={handleForm}
          required
          data-test="registry-name-input"
        />
        <button type="submit" data-test="registry-save">Salvar {transacao}</button>
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
