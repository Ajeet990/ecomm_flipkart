import { useState } from 'react'
// import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './Components/PageNotFound'
import { RequireAuth } from './Authorization/RequireAuth'
import { AuthProvider } from './Authorization/Auth'
import About from './Components/About'

function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<RequireAuth><Home/></RequireAuth>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<RequireAuth><About/></RequireAuth>} />
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
