import React from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../router/RouterPage'
const MenuPage = () => {
  return (
    <>
    <div className='my-5'>
        <Link to ="/" className='me-3'>home</Link>
        <Link to ="/stu" className='me-3'>학생관리</Link>
        <Link to ="/cou" className='me-3'>강좌관리</Link>
        <hr/>
    </div>
        <RouterPage/>
    </>
  )
}

export default MenuPage