import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { AuthLogin } from '../../api/auth';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>();
  const { login } = useAuth();


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const token = async () => {
      await AuthLogin({ email, password })
      await console.log(token)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
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
  )
}

export default Login