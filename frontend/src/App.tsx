import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login/Login'

function App() {


  return (
    <>
    <AuthProvider>
      <Login /> 
    </AuthProvider>
    </>
  )
}

export default App
