import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Tickets from './pages/Tickets/Tickets'
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={ <Navigate to='/login' />} />
          <Route path='/login' element={
            <ProtectedRoute requireAuth={false} navigateTo='/tickets'>
              <Login />
            </ProtectedRoute> } />
          <Route path='/tickets' element={ 
            <ProtectedRoute requireAuth={true}>
              <Tickets />
            </ProtectedRoute> } />
          <Route path='/dashboard' element={
            <ProtectedRoute requireAuth={true}>
              <Dashboard />
            </ProtectedRoute> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}
export default App
