import { useContext, useEffect } from "react"
import styled from "styled-components"
import AuthContext from "../contexts/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

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

    axios.post(`${process.env.VITE_API_URL}/nova-transacao`, body, config)
      .then(res => navigate("/"))
      .cathc(err => alert(err.response.data))
  }

  useEffect(() => {
    if (!token) navigate("/")
    handleTransaction()
  }, [])

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
        />
        <input 
          name="descricao"
          placeholder="Descrição" 
          type="text" 
          value={form.descricao}
          onChange={handleForm}
          required
        />
        <button type="submit">Salvar {transacao}</button>
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
