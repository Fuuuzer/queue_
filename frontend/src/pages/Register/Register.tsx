import React from 'react'
import { CreateUser } from '../../api/register';
import { useAuth } from '../../contexts/AuthContext';
import { isAxiosError } from 'axios';

const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth();
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  
     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      setIsRunning(true);
      e.preventDefault();
      try {
        const userResp = await CreateUser({name, email, password})
        console.log(userResp)
        login(userResp.token)
      } catch (err) {
         if (isAxiosError(err)) {
            console.error(err)   
        } else {
          console.error('deu um erro')
      }
      } finally {
        setIsRunning(false)
      }
    }

  return (
     <form onSubmit={handleSubmit}>
      <label htmlFor="email">Name</label>
      <input
        id='name'
        type="name"
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
    </form>
  )
}

export default Register