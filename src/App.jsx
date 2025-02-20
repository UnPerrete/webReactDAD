import './App.css'
import { Perrito } from './api'

import {
  LoginContext,
  LoginProvider
} from './context'

import { useContext, useEffect } from 'react'

import { Navbar} from './components'
import {  Routes, Route }from 'react-router'


import {
  LoginPage,
  Home,
  ShoppingCart,
} from './pages'

import { FormPdf } from './pages/FormPdf'



function App() {
  const { theme } = useContext(LoginContext);

  useEffect(() =>{
    const rootElement = document.getElementById("root");
    rootElement.className = theme;
  },[theme])
  return (

    <main className={theme} data-bs-theme={theme}>
      <div className='mt-5' >
        {<Navbar />}

        <LoginProvider>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/perrito' element={<Perrito />}></Route>
            <Route path="/carrito" element={<ShoppingCart />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/form' element={<FormPdf />}></Route>
          </Routes>
        </LoginProvider>
      </div>
    </main>

  )
}
export default App
