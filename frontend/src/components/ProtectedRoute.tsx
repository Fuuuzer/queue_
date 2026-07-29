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
  const { isAuthenticated } = useAuth();
  if (requireAuth && isAuthenticated ) {
      return children
    } 
  if(!requireAuth && !isAuthenticated) {
    return children
  }
  if(!requireAuth && isAuthenticated) {
     return <Navigate to={navigateTo ?? '/tickets'} /> // 
  }
  return (
    <Navigate to={'/login'} />
  )
} 

export default ProtectedRoute