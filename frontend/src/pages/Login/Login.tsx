import React from 'react'
import { AuthLogin } from '../../api/auth'
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>();
  const {login} = useAuth();
  
  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
  }


  return (
    <form action="">
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
       <button type="submit" onClick={handleSubmit}></button>
    </form>
  )
}

export default Login