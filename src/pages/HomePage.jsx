import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import { TransactionContext } from "../contexts/TransactionContext"
import apiOperations from "../services/apiOperations"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

export default function HomePage({ value, description }) {
  const [operations, setOperations] = useState([])
  const { user } = useContext(UserContext)
  const { operation } = useContext(TransactionContext)

  useEffect(getOperationsList, [])  // executa a função uma única vez qdo a tela abre

  function getOperationsList() { 
    apiOperations.getOperations(user.token)
    .then(res => {
      setOperations(res.data)
    })
    .catch(err => {
      if(!user.token) {
        alert("Faça login!")
      } else {
          alert(err.response.data.message)}
    })
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        {operations.length === 0 ? (
          <StyledSubtitle>
            Não há registros de entrada ou saída
          </StyledSubtitle>
        ) : (
          <ul>
            {operations.map(op => (
              <ListItemContainer key={op.id}>
                <div>
                  <span>{dayjs.date()}/{dayjs.month() + 1}</span>
                  <strong>{op.description}</strong>
                </div>
                <Value color={"negativo"}>{op.value}</Value>
              </ListItemContainer>
            ))}
          </ul>
        )}
       

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        {/* arrumar essa rota */}
        <Link to="/nova-transacao/:entrada">   
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to="/nova-transacao/:saida"> 
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
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
  display: flex;
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
const StyledSubtitle = styled.p`
  margin: 10px 0;
  font-size: 18px;
  line-height: 22px;
  color: #868686;
  align-self: flex-start;
`