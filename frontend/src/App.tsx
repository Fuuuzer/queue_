import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'

import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Tickets from './pages/Tickets/Tickets'

function App() {

  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={ <Navigate to='/login' />} />
          <Route path='/login' element={<Login /> } />
          <Route path='/tickets' element={<Tickets /> } />
          <Route path='/dashboard' element={<Dashboard /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}
export default App
