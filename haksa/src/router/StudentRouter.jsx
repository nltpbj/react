import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Listpage from '../components/Students/Listpage'
import InsertPage from '../components/Students/InsertPage'

const StudentRouter = () => {
  return (
    <Routes>
        <Route path="" element={<Listpage/>}/>
        <Route path="/insert" element={<InsertPage/>}/>
    </Routes>
  )
}

export default StudentRouter