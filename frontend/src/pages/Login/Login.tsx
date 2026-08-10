import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { AuthLogin } from '../../api/auth';
import { isAxiosError } from 'axios';

interface Feedback {
  type: 'error' | 'success';
  message: string;
} // Interface para poder unificar a questão de erro ou sucesso ao se logar

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth();
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [feedback, setFeedback] = React.useState<Feedback | null>(null)


   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsRunning(true);
    e.preventDefault();
    try {
      const response = await  AuthLogin({email, password});
      login(response.token);
      setFeedback({type: 'success', message: 'Usuário logado com sucesso!'})
    } catch (err) {
      if (isAxiosError(err)) {
        setFeedback({type:'error',  message:err.response?.data.message}); //Erro do axios
      } else {
        setFeedback({type: 'error', message:'Houve um erro ao fazer o login'})
      }
      } finally {
        setIsRunning(false)
      } 
    }

  return (
    <form onSubmit={handleSubmit}>
      {feedback && <p style={{color: feedback.type === 'error' ? 'red' : 'green'}} >{feedback.message}</p>}
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
      <button type="submit" disabled={isRunning}>Enviar</button>
    </form>
  )
}

export default Login