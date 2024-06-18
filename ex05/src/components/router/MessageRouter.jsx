import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InsertPage from '../message/InsertPage'
import ReceivePage from '../message/ReceivePage'
import SendPAge from '../message/SendPAge'
import ReadSend from '../message/ReadSend'
import ReadReceive from '../message/ReadReceive'
import DeletePage from '../message/DeletePage'

const MessageRouter = () => {
  return (
    <Routes>
        <Route path='insert' element={<InsertPage/>}/>
        <Route path='send' element={<SendPAge/>}/>
        <Route path='receive' element={<ReceivePage/>}/>
        <Route path='send/:mid' element={<ReadSend/>}/>
        <Route path='receive/:mid' element={<ReadReceive/>}/>
        <Route path='delete' element={<DeletePage/>}/>
    </Routes>
  )
}

export default MessageRouter