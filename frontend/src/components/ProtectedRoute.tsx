import React from 'react'

interface ProtectedProps {
  requireAuth: boolean;
  children: React.ReactNode;
}

//TypeScript NÃO obriga a desestruturar todos os campos da interface

const ProtectedRoute =({children, requireAuth} : ProtectedProps) => {
  return (
    <div>ProtectedRoute</div>
  )
};

export default ProtectedRoute