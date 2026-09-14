import React from 'react'
import { CreateUser } from '../../api/register';
import { useAuth } from '../../contexts/AuthContext';
import { isAxiosError } from 'axios';

interface Feedback {
  type: 'error' | 'success';
  message: string;
}

const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth();
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [feedback, setFeedback] = React.useState<Feedback | null>(null)

  
     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      setIsRunning(true);
      e.preventDefault();
      try {
        const userResp = await CreateUser({name, email, password})
        console.log(userResp)
        login(userResp.token)
        setFeedback({type: 'success', message: 'Usuário cadastrado com sucesso!'})
      } catch (err) {
         if (isAxiosError(err)) {
           setFeedback({type:'error',  message:err.response?.data.message}); //Erro do axios
        } else {
          setFeedback({type: 'error', message:'Houve um erro ao fazer o cadastro'})
      }
      } finally {
        setIsRunning(false)
      }
    }

  return (
     <form onSubmit={handleSubmit}>
      {feedback && <p style={{color: feedback.type === 'error' ? 'red' : 'green'}} >{feedback.message}</p>}
      <label htmlFor="email">Name</label>
      <input
        id='name'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
      <p>Já possui login? <a href="/login">Login</a> </p>
    </form>
  )
}

export default Register