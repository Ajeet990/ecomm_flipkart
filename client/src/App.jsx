import { useState } from 'react'
// import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './Components/PageNotFound'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>

    </>
  )
}

export default App
