import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { AuthLogin } from '../../api/auth';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>();
  const { login } = useAuth();
  const [isRunning, setIsRunning] = React.useState<boolean>(false)


   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsRunning(true)
    e.preventDefault()
    try {
      const response = await  AuthLogin({email, password});
      login(response.token);
    } catch (err) {
      setError('o que coloco aq ???')
      console.error(err)
    } finally {
      setIsRunning(false)
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
      <button type="submit" disabled={isRunning ? true : false}>Enviar</button>
    </form>
  )
}

export default Login