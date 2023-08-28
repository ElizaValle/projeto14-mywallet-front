import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import AuthContext from "../contexts/AuthContext"
import { useContext, useState } from "react"
import axios from "axios"

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", senha: "" })
  const { setToken, nomeUsuario } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleLogin(e) {
    e.preventDefault()

    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, form)
      .then((res) => {
        setToken(res.data)
        localStorage.setItem("token", res.data)
        navigate("/home")
      })
      .catch(err => console.log(err))
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
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
          name="senha"
          placeholder="Senha" 
          type="password" 
          autoComplete="new-password"
          value={form.senha}
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
