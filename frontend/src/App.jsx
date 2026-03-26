import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import FoodPartnerLogin from './pages/FoodPartnerLogin';
import FoodPartnerRegister from './pages/FoodPartnerRegister';
import CreateFood from './pages/CreateFood';
import UserProtectedWrapper from './ProtectedWrapper/UserProtectedWrapper';
import FPProtectedWrapper from './ProtectedWrapper/FPProtectedWrapper';
import Start from './pages/Start';
import DisplayReel from './pages/DisplayReel'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route
        path='/reel'
        element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/foodpartnerlogin' element={<FoodPartnerLogin />} />
      <Route path='/foodpartnerregister' element={<FoodPartnerRegister />} />
      <Route
  path='/getsavefood'
  element={
    <UserProtectedWrapper>
      <DisplayReel />
    </UserProtectedWrapper>
  }
/>
      <Route
        path='/createfood'
        element={
          <FPProtectedWrapper>
            <CreateFood />
          </FPProtectedWrapper>
        }
      />
    </Routes>
  )
}

export default App