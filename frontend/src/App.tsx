import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Tickets from './pages/Tickets/Tickets'
import ProtectedRoute from './components/ProtectedRoute'
import CreateTicketForm from './pages/CreateTicket/CreateTicket'
import Register from './pages/Register/Register'

function App() {

  return (
    <main>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={ <Navigate to='/register' />} />
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
          <Route path='/register' element={<Register />} />
          <Route path='/tickets/create' element={
            <ProtectedRoute requireAuth={true}>
              <CreateTicketForm />
            </ProtectedRoute> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </main>
  )
}
export default App
