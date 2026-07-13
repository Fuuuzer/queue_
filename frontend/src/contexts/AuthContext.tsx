import React from 'react'

  interface AuthContextData {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
  } // "prateleira, define os itens que ficarao disponiveis para o contexto de autenticação"

const AuthContext = React.createContext<AuthContextData | undefined>(undefined); // "cria o contexto de autenticação, que será usado para fornecer e consumir os dados de autenticação em toda a aplicação"

export default AuthContext