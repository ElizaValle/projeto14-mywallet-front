import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import apiAuth from "../services/apiAuth"
import { UserContext } from "../contexts/UserContext"

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const { user, setUser } = useContext(UserContext) 
  const navigate = useNavigate()

  console.log(user)
  
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSignIn(e) {
    e.preventDefault()

    apiAuth.signIn(form)
    .then(res => {
      console.log(res.data)
      const { id, name, token } = res.data
      setUser({ id, name, token })
      // localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify({ id, name, token }))
      navigate("/home")
    })
  }

  return (
    <SingInContainer>
      <form onSubmit={handleSignIn}>
        <MyWalletLogo />
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
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
