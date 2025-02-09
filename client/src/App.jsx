import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Service } from './pages/Service'
import { Register } from './pages/register'
import { Login } from './pages/login'
import { Navbar } from './components/Navbar'
import {Error} from "./pages/Error"
import { Footer } from './components/Footer/Footer'
import { Logout } from './pages/Logout'
import { AdminLayout } from './components/Layouts/Admin-Layout'
import { AdminContacts } from './pages/AdminContacts'
import { AdminUsers } from './pages/AdminUsers'
import { AdminUpdate } from './pages/AdminUpdate'
const App = () => {
  return (
   <>
   <BrowserRouter>
    <Navbar />
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/contact" element={<Contact />}/>
    <Route path="/service" element={<Service />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/logout" element={<Logout />}/>
    <Route path="*" element={<Error />}/>
    <Route path="/admin" element={<AdminLayout />}>
    <Route path="users" element={<AdminUsers />}/>
    <Route path="contacts" element={<AdminContacts />}/>
    <Route path="users/:id/edit" element={<AdminUpdate />} />

    </Route>


   </Routes>
   <Footer />
   </BrowserRouter>
   </>
  )
}

export default App