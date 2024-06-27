import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GoodsRouter from './GoodsRouter'
import HomePage from '../common/HomePage'
import UserRouter from './UserRouter'

const RouterPage = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/goods/*' element={<GoodsRouter/>}></Route>
        <Route path='/users/*' element={<UserRouter/>}></Route>
    </Routes>
  )
}

export default RouterPage