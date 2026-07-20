import './App.css'
import AuthContext from './contexts/AuthContext'
import Login from './pages/Login/Login'

function App() {


  return (
    <>
    <AuthContext>
      <Login /> 
    </AuthContext>
    </>
  )
}

export default App
