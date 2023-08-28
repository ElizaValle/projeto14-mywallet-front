import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import dayjs from "dayjs"

export default function HomePage() {
  const [transacao, setTransacao] = useState(undefined)
  const { token, nomeUsuario, setToken, setNomeUsuario } = useContext(AuthContext)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const navigate = useNavigate()

  function logout() {
    axios.post(`${process.env.VITE_API_URL}/logout`, {}, config)
      .then(() => {
        setToken(undefined)
        setNomeUsuario(undefined)
        localStorage.clear()
        navigate("/")
      })
      .catch(err => alert(err.response.data))
  }

  function saldo() {
    let saldo = 0

    transacao.forEach(t => {
      if (t.tipo === "proventos") {
        saldo += t.valor
      } else if (t.tipo === "despesas") {
        saldo -= t.valor
      }
    })

    return saldo
  }

  const saldoTotal = transacao && saldo()

  function exibeTransacao() {
    axios.get(`${import.meta.env.VITE_API_URL}/transacao`, config)
      .then(res => setTransacao(res.data))
      .catch(err => console.log(err.response))
  }

  useEffect(() => {
    if (!token) navigate("/")
    exibeTransacao()
  }, [])

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {nomeUsuario}</h1>
        <BiExit onClick={logout} data-test="logout" />
      </Header>

      <TransactionsContainer>
        {transacao && transacao.length === 0 && <>Não há registros de entrada e saída</>}
        {transacao && transacao.length > 0 && (
          <>
            <ul>
              <ListItemContainer>
                {transacao.map(t =>
                  <>
                    <div key={t._id}>
                      <span data-test="registry-name">{dayjs(t.date).format("DD/MM")}</span>
                      <strong data-test="registry-name">{t.descricao}</strong>
                    </div>
                    <Value color={saldoTotal > 0 ? "positivo" : "negativo"} data-test="registry-amount">{saldoTotal}</Value>
                  </>
                )} 
              </ListItemContainer>
            </ul>
            <article>
              <strong>Saldo</strong>
              <Value color={saldoTotal > 0 ? "positivo" : "negativo"} data-test="total-amount">{saldoTotal}</Value>
            </article>
          </>          
        )}
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")} data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")} data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`