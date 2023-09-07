import React from 'react'
import ViewCategory from '../../component/viewcategory/ViewCategory'
import Navbar from '../../component/navbar/Navbar'
import Sidebar from '../../component/sidebar/Sidebar'

const HomeAdminCategory = () => {
  return (
    <div className='Adminhome'>
    <Navbar/>
    <div className='adminviewstyle'>
    <Sidebar/>
    <ViewCategory/>
    </div>
   </div>
  )
}

export default HomeAdminCategory