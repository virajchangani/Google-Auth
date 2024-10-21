import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './component/SignUp.jsx'
import Login from './component/Login.jsx'
import Dashboard from './component/Dashboard.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
<Routes>
  <Route path='/' element ={<SignUp/>}></Route>
  <Route path='/Login' element = {<Login/>}></Route>
  <Route path='/Dashboard' element = {<Dashboard/>}></Route>
 
</Routes>
</BrowserRouter>
  </StrictMode>,
)