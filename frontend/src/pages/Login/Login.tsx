import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { AuthLogin } from '../../api/auth';
import { isAxiosError } from 'axios';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>();
  const [success, setSuccess] = React.useState<string | null>();
  const { login } = useAuth();
  const [isRunning, setIsRunning] = React.useState<boolean>(false)


   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsRunning(true);
    setError(null);
    setSuccess(null);
    e.preventDefault();
    try {
      const response = await  AuthLogin({email, password});
      login(response.token);
      setSuccess('Usuário logado com sucesso!')

    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.message);
      } else {
        setError('Houve um erro ao fazer o login')
      }
    } finally {
      setIsRunning(false)
    } 
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      { error && <p style={error ? {color: 'red',} : {color: 'green'}}>{error || success}</p> || success && <p style={error ? {color: 'red',} : {color: 'green'}}>{error || success}</p>}
      
      <label htmlFor="email">Email</label>
      <input
        id='email'
        type="email"
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