import React from 'react'
import "../homeforadmin/AdminHomeStyle.css"
import Sidebar from '../../component/sidebar/Sidebar'
import Navbar from '../../component/navbar/Navbar'

import ViewProduct from '../../component/viewproduct/ViewProduct'
const AdminHome = () => {
  return (
    <div className='Adminhome'>
        <Navbar/>
        <div className='adminviewstyle'>
        <Sidebar/>
        <ViewProduct/>
        </div>
    </div>
  )
}

export default AdminHome