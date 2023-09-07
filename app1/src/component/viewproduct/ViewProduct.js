import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../viewproduct/ViewProductstyle.css"
import {DeleteForeverOutlined, EditAttributesOutlined} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {Link, NavLink, Outlet} from "react-router-dom"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const ViewProduct = () => {
 const [Products, setProdcuts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get("https://localhost:44375/api/Products");
                setProdcuts(result.data.$values);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();

    }, []);
 const handledelete=async (ProductID)=>{
    try {
       await axios.delete(`https://localhost:44375/api/Products/${ProductID}`)
        setProdcuts(Products.filter((p)=>p.id !== ProductID))
        
    } catch (error) {
        console.log(error)
    }

 }   
    return (
        <div className='viewproductcontainer'>
                       

            <div className='viewaddproduct'>
              <Link to="/AddProduct"><button>Add Product  <AddIcon/> </button></Link>
            </div>
           
            <table>
                     <thead >
                         <tr>
                             <th>Name</th>
                             <th>Price</th>
                             <th>Stock</th>
                             <th>Image</th>
                             <th>Edit</th>
                             <th>Delete</th>
                         </tr>
     
                     </thead>
                     <tbody>
                {
                  Products.map((p) => {
                        return (
                      
                             
                                    <tr>
                                        <td>{p.name}</td>
                                        <td>{p.price}</td>
                                        { p.stock==0? <td id="stockiszero">{p.stock}</td>: <td>{p.stock}</td>}
                                        <td id='imgtd'><img src={`https://localhost:44375/${p.imageUrl}`}></img></td>
                                       
                                        <td id='editbtn'><Link to={`/EditProduct/${p.id}`}><EditOutlinedIcon  /></Link></td>
                                        <td id ="delbtn" onClick={()=>handledelete(p.id)}><DeleteForeverOutlined  /></td>
                                    </tr>

                       
                            
                        )
                    })
                }
                </tbody>
            </table>


        </div>
        
    )
}

export default ViewProduct