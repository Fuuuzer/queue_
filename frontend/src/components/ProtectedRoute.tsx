import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
  requireAuth: boolean;
  navigateTo?: string;
  children: React.ReactNode;
}
//TypeScript NÃO obriga a desestruturar todos os campos da interface

const ProtectedRoute =({children, requireAuth, navigateTo} : ProtectedProps) => {
  const { isAuthenticated } = useAuth(); //com esse hook eu consigo pegar tudo de dentro do contexto de autenticacao
  if (requireAuth && isAuthenticated ) {   //se requer autenticação e está autenticado
      return children //retorna o children, pagina que eu quero acessar
    } 
  if(!requireAuth && !isAuthenticated) { // se não requer autenticação  não está autenticado
    return children
  } 
  if(!requireAuth && isAuthenticated) {// se não requer autenticação e está autenticado
     return <Navigate to={navigateTo ?? '/tickets'} /> // 
    // {navigateTo ?? '/tickets'} se eu mantivesse assim, caso futuramente alguma rota caia nesse if ele nao iria retornar para uma rota "padrao"
     // ?? nullish coalescing operator Ele funciona: assim: a ?? b retorna a se a não for null nem undefined; caso contrário, retorna b.
  }
  return (
    <Navigate to={'/login'} />
  )
} 

export default ProtectedRoute