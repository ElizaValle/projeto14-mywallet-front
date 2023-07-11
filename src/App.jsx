import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import UserProvider, { UserContext } from "./contexts/UserContext"
import TransactionProvider, { TransactionContext } from "./contexts/TransactionContext"

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <TransactionProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
            </Routes> 
          </UserProvider>
        </TransactionProvider>
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
