import { useState } from 'react'
// import './App.css'
import './CustomCss.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './Components/PageNotFound'
import { RequireAuth } from './Authorization/RequireAuth'
import { AuthProvider } from './Authorization/Auth'
import About from './Components/About'
import SendMail from './SendMailSystem/SendMail'
import MyProducts from './Components/MyProducts'
import Footer from './Components/Footer'
import AddProduct from './Components/AddProduct'
import EditProduct from './Components/EditProduct'


function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<RequireAuth><Home/></RequireAuth>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/sendMail' element={<SendMail/>} />
        <Route path='/about' element={<RequireAuth><About/></RequireAuth>} />
        <Route path='/my_product' element={<RequireAuth><MyProducts/></RequireAuth>} />
        <Route path='/add_product' element={<RequireAuth><AddProduct/></RequireAuth>} />
        <Route path='/edit_product/:product_id' element={<RequireAuth><EditProduct/></RequireAuth>} />
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>
      <Footer />
    </AuthProvider>
    </>
  )
}

export default App
