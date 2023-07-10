import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import apiAuth from "../services/apiAuth"

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSignUp(e) {
    e.preventDefault()
    
    apiAuth.singUp(form) 
    .then(res => navigate("/"))
    .cathc(err => {
      console.log(err.response.data)
      alert(err.response.data.message)
    })
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input 
          name="name" 
          placeholder="Nome" 
          type="text" 
          value={form.name} 
          onChange={handleForm} 
          required 
        />
        <input 
          name="email" 
          placeholder="E-mail" 
          type="email" 
          value={form.email} 
          onChange={handleForm} 
          required 
        />
        <input 
          name="password" 
          placeholder="Senha" 
          type="password" 
          autocomplete="new-password" 
          value={form.password} 
          onChange={handleForm} 
          required 
        />
        <input 
          name="confirmPassword" 
          placeholder="Confirme a senha" 
          type="password" 
          autocomplete="new-password" 
          value={form.confirmPassword} 
          onChange={handleForm} 
          required 
        />
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
