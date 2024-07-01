import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../common/HomePage'
import Bjrouter from './Bjrouter'

const RouterPage = () => {
  return (
    <Routes>
     <Route path='/' element={<HomePage/>}></Route>
     <Route path='/bj/*' element={<Bjrouter/>}></Route>
    </Routes>
  )
}

export default RouterPage