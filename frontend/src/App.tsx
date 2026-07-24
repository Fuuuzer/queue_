import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
<<<<<<< HEAD
=======

>>>>>>> f48728af0b801178c28a90caaf239dec55c719c4
import Login from './pages/Login/Login'

function App() {


  return (
    <>
<<<<<<< HEAD
    <AuthProvider>
      <Login /> 
    </AuthProvider>
=======
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
>>>>>>> f48728af0b801178c28a90caaf239dec55c719c4
    </>
  )
}
export default App
