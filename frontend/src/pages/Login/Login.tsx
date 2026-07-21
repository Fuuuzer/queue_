import React from 'react'
import { AuthLogin } from '../../api/auth'

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>()

  return (
    <div>Login</div>
  )
}

export default Login