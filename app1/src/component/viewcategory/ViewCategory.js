import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import {DeleteForeverOutlined, EditAttributesOutlined, Filter} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ViewCategory = () => {
const [categories,setcategories]=useState([]);
useEffect(() => {
  const fetchcategories= async()=>{
  try {
      const result = await axios.get("https://localhost:44375/api/Categories");
      setcategories(result.data.$values);
      console.log(result.data.$values);
    }

  catch (error) {
    console.log(error)
  }
}
  fetchcategories();
},[])
 const handledelete=(id)=>{
 try {
  axios.delete(`https://localhost:44375/api/Categories/${id}`)
  setcategories(categories.filter((c)=> c.id != id))
 } catch (error) {
  console.log(error)
 }

 }

  return (
    <div className='viewproductcontainer'>
            <div className='viewaddproduct'>
              <Link to={"/AddCategory"}><button>Add Category <AddIcon/> </button></Link>
       
          
            </div>
           
            <table>
                     <thead >
                         <tr>
                             <th>Name</th>
                             <th>Image</th>
                             <th>Edit</th>
                             <th>Delete</th>
                         </tr>
     
                     </thead>
                     <tbody>
                {
                  categories.map((c) => {
                        return (
                                    <tr>
                                      <td>{c.name}</td>

                                        <td id='imgtd'><img src={`https://localhost:44375/${c.imageUrl}`}></img></td>
                                        <td id='editbtn'>  <Link to={`/EditCategory/${c.id}`}> <EditOutlinedIcon  /></Link></td>
                                        <td  id='delbtn' onClick={()=>{handledelete(c.id)}}><DeleteForeverOutlined  /></td>
                                    </tr>
                        )
                    })
                }
                </tbody>
            </table>


        </div>
  )
}

export default ViewCategory