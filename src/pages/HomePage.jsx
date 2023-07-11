import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import apiOperations from "../services/apiOperations"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

export default function HomePage({  }) {
  const [operations, setOperations] = useState([])
  // const { _id, date, type, value, description } = op
  const { user } = useContext(UserContext)

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

  function calculateBalance() {
    const sum = operations.reduce((accumulatedTotal, currentValue) => (
      currentValue.type === "income" ? accumulatedTotal + currentValue : accumulatedTotal - currentValue, 0
    ))
    return sum.toFixed(2)
  }

  const totalBalance = operations && calculateBalance()

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        {operations && operations.length === 0 && 
          <>
            Não há registros de entrada ou saída
          </>
        }
        {operations && operations.length > 0 && (
          <ul>
            {operations.map(op => (
              <ListItemContainer key={op._id} operations={op} >
                <div>
                  <span>{dayjs(op.date).format("DD/MM")}</span>
                  <strong>{op.description}</strong>
                </div>
                <Value color={op.type === "expense" ? "negativo" : "positivo"}>
                  {op.value.toFixed(2).toString().replace(".", ",")}
                </Value>
              </ListItemContainer>
            ))}
          </ul>

        )}
       
        <article>
          <strong>Saldo</strong>
          <Value color={totalBalance > 0 ? "positivo" : "negativo"}>
            {totalBalance.toString().replace(".", ",")}
          </Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        {/* arrumar essa rota */}
        <Link to="/nova-transacao/entrada">   
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to="/nova-transacao/saida"> 
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