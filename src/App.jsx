import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import AuthContext from "./contexts/AuthContext"
import { useState } from "react"

export default function App() {
  const [token, setToken] = useState("")

  return (
    <PagesContainer>
      <BrowserRouter>
        <AuthContext.Provider value={{ token, setToken }}>
          <Routes>
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/" element={<SignInPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
