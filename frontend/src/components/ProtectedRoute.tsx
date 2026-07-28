import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
  requireAuth: boolean;
  navigateTo: string | null;
  children: React.ReactNode;
}
//TypeScript NÃO obriga a desestruturar todos os campos da interface

const ProtectedRoute =({children, requireAuth, navigateTo} : ProtectedProps) => {
  const { isAuthenticated } = useAuth(); //com esse hook eu consigo pegar tudo de dentro do contexto de autenticacao
  if (requireAuth && isAuthenticated ) {   //se requer autenticação e está autenticado
      return children //retorna o children, pagina que eu quero acessar
    } 
  if(!requireAuth && !isAuthenticated) { // se não requer autenticação  não está autenticado
    return children //retorna o children, pagina que eu quero acessar
  } 
  if(!requireAuth && isAuthenticated) {// se não requer autenticação e está autenticado
     return <Navigate to={navigateTo ?? ''} />
  }
  return (
    <Navigate to={'/login'} />
  )
} 

export default ProtectedRoute