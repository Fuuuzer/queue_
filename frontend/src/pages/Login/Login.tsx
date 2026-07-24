import React from 'react'
<<<<<<< HEAD
import { AuthLogin } from '../../api/auth'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  useAuth()

  return (

    <div>Login</div>
=======
import { useAuth } from '../../contexts/AuthContext';
import { AuthLogin } from '../../api/auth';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<boolean | null>();
  const { login } = useAuth();


   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const response = await  AuthLogin({email, password});
      login(response.token);
      setError(false)
    } catch (err) {
      setError(true)
      console.error(err)
    } 
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      {error && <p>Houve um erro ao cadastrar o usuário</p>}
      <label htmlFor="email">Email</label>
      <input
        id='email'
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Senha</label>
      <input
        id='password'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Enviar</button>
    </form>
>>>>>>> f48728af0b801178c28a90caaf239dec55c719c4
  )
}

export default Login