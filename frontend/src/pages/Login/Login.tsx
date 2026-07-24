import React from 'react'
import { AuthLogin } from '../../api/auth'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  useAuth()

  return (

    <div>Login</div>
  )
}

export default Login