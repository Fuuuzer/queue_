import React from 'react'
import AuthContext from '../../contexts/AuthContext'
import { AuthLogin } from '../../api/auth'

const Login = () => {
  const [userCredentials, setUserCredentials] = React.useState<string | null>();
  AuthLogin(userCredentials)

  AuthLogin
  return (
    <AuthContext>
    <div>Login</div>
    </AuthContext>
  )
}

export default Login