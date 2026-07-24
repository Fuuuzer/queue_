import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login/Login'

function App() {


  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}
export default App
