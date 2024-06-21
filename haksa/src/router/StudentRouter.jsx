import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Listpage from '../components/Students/Listpage'
import InsertPage from '../components/Students/InsertPage'
import ReadPage from '../components/Students/ReadPage'
import UpdatePage from '../components/Students/UpdatePage'

const StudentRouter = () => {
  return (
    <Routes>
        <Route path="" element={<Listpage/>}/>
        <Route path="/insert" element={<InsertPage/>}/>
        <Route path='/read/:scode' element={<ReadPage/>}/>
        <Route path='/update/:scode' element={<UpdatePage/>}/>
    </Routes>
  )
}

export default StudentRouter