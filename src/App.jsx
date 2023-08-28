import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import AuthContext from "./contexts/AuthContext"
import { useState } from "react"

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [nomeUsuario, setNomeUsuario] = useState(localStorage.getItem("nomeUsuario"))

  return (
    <PagesContainer>
      <AuthContext.Provider value={{ token, setToken, nomeUsuario, setNomeUsuario }}>
        <BrowserRouter>
            <Routes>
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/" element={<SignInPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
            </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
