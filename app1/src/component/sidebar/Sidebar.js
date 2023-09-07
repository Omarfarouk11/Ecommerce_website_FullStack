import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import "../sidebar/Sidebarstyle.css"
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const username=localStorage.getItem("Username")
  return (
    <div className='siebar'>
        <div className='Adminname'>
            <h3>Welcome</h3>
            <h6> {username}</h6>
      
        </div>
        <div className='listitem'>
        <ul>
            <li>
                <Link to={"/admin"}> Product</Link>
            </li>
      
            <li>
            <Link to={"/HomeAdminCategory"}> Category</Link>
                
            </li>
          
        </ul>
        </div>
    </div>
  )
}

export default Sidebar