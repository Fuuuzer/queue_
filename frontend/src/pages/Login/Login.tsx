import React from 'react'
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>();

  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
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
       {email}
      <label htmlFor="password">Senha</label>
      {password}
      <input 
       id='password' 
       type="password" 
       value={password}
       onChange={(e) => setPassword(e.target.value)}/>
       <button type="submit" ></button>
    </form>
  )
}

export default Login