import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
  requireAuth: boolean;
  children: React.ReactNode;
}

//TypeScript NÃO obriga a desestruturar todos os campos da interface

const ProtectedRoute =({children, requireAuth} : ProtectedProps) => {
  const { isAuthenticated } = useAuth(); //com esse hook eu consigo pegar tudo de dentro do contexto de autenticacao
  if (requireAuth) {  
    if (isAuthenticated) {
      return <>{children}</>
    }
  }
  return (
    <Navigate to={'/login'}/>
  )
};

export default ProtectedRoute