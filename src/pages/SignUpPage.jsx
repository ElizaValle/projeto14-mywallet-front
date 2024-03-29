import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmeSenha: "" })
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSignUp(e) {
    e.preventDefault()

    if (form.senha !== form.confirmeSenha) {
      alert("Senhas não coincidem!")
      return
    }

    axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, form)
      .then(res => navigate("/"))
      .catch(err => {
        //console.log(err)
        alert(err.response.data.message)
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input 
          name="nome"
          placeholder="Nome" 
          type="text"
          value={form.nome}
          onChange={handleForm} 
          required 
          data-test="name"
        />
        <input 
          name="email"
          placeholder="E-mail" 
          type="email"
          value={form.email}
          onChange={handleForm} 
          required 
          data-test="email"
        />
        <input 
          name="senha"
          placeholder="Senha" 
          type="password" 
          autoComplete="new-password"
          value={form.senha}
          onChange={handleForm} 
          required 
          data-test="password"
        />
        <input 
          name="confirmeSenha"
          placeholder="Confirme a senha" 
          type="password" 
          autoComplete="new-password"
          value={form.confirmeSenha}
          onChange={handleForm} 
          required 
          data-test="conf-password"
        />
        <button type="submit" data-test="sign-up-submit">Cadastrar</button>
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
