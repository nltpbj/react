import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/users/LoginPage'
import Joinpage from '../components/users/Joinpage'

const UserRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/join' element={<Joinpage/>}></Route>
    </Routes>
  )
}

export default UserRouter