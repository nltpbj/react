import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MenuPage from '../common/MenuPage'

const Bjrouter = () => {
  return (
    <Routes>
        <Route path='/bbs' element={<MenuPage/>}/>
    </Routes> 
  )
}

export default Bjrouter