import React from 'react';

interface AuthContextData {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
} // prateleira, define os itens que ficarao disponiveis para o contexto de autenticação

const AuthContext = React.createContext<AuthContextData | undefined>(undefined); // cria o contexto de autenticação, que será usado para fornecer e consumir os dados de autenticação em toda a aplicação

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("token") // utilizei generics, para definir o tipo do estado, que pode ser string ou null.
  );

  function login(newToken: string) {
    setToken(newToken);
    localStorage.setItem('token', newToken)
  }

  function logout() {
    setToken(null)
    localStorage.removeItem('token')
  }
  return (
    <AuthContext.Provider
    value={{
      token,
      login,
      logout,
      isAuthenticated: token !== null,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }

  return context
}

export default AuthContext