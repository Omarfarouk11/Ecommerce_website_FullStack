import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';
import "../viewcart/ViewCartstyle.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const ViewCart = () => {
    const [cart, setcart] = useState([])
    const[totalprice,settotalprice]=useState(0);
    const [discount,setdiscount]=useState(0);
    useEffect(() => {
        const fetchcart = async () => {
            try {
                const token = localStorage.getItem('Token');
                const headers = { Authorization: `Bearer ${token}` };
                const result = await axios.get("https://localhost:44375/api/Carts", { headers });
                console.log(result)
                setcart(result.data.$values);
                const newTotalPrice = result.data.$values.reduce((accumulator, item) => {
                    return accumulator + item.price * item.quantity;
                }, 0);
            const newDiscount = newTotalPrice * 0.2;
            settotalprice(newTotalPrice);
            setdiscount(newDiscount);
           
                    
    
            } catch (error) {
                console.log(error);
            }
        }
 
        



        fetchcart();

    }, []);

const handleincreasequantity=(id)=>{
   

    const cartupdated =cart.map((item)=>{
        if(item.id===id){
            const priceChange = item.price;
                const newTotalPrice = totalprice + priceChange;
                const newDiscount = newTotalPrice * 0.2;
                settotalprice(newTotalPrice);
                setdiscount(newDiscount);
            return{
                ...item,
                quantity:item.quantity +1,
                totalPrice:totalprice+item.totalPrice
       
                

            }
        }
 
    return item
    })
    setcart(cartupdated);
    UpdateincreaseQuantity(id,1);
  
}
const handledecreasequantity=(id)=>{
    const cartupdated =cart.map((item)=>{


        if(item.id===id && item.quantity>=1){
            const priceChange = item.price;
            const newTotalPrice = totalprice - priceChange;
            const newDiscount = newTotalPrice * 0.2;
            settotalprice(newTotalPrice);
            setdiscount(newDiscount);
            return{
                ...item,
                quantity:item.quantity -1,
            
            }   
        }
        return item
    })
    setcart(cartupdated);
    UpdatedecreaseQuantity(id,1);
  
}

const UpdatedecreaseQuantity=(id,quantity)=>{
    try {
        var token=localStorage.getItem("Token");
        var headers={Authorization:`Bearer ${token}`}
        axios.post(`https://localhost:44375/api/Carts/decrease?productId=${id}&quantity=${quantity}`,null,{headers});
       
    } catch (error) {
        console.log(error);
        
    }
}
const UpdateincreaseQuantity=(id,quantity)=>{
    try {
        var token=localStorage.getItem("Token");
        var headers={Authorization:`Bearer ${token}`}
        axios.post(`https://localhost:44375/api/Carts/incearse?productId=${id}&quantity=${quantity}`,null,{headers});
       
    } catch (error) {
        console.log(error);
        
    }
}
const HandleRemoveitem=(id)=>{
    try {
        const token = localStorage.getItem('Token');
        const headers = { Authorization: `Bearer ${token}` };

         axios.delete(`https://localhost:44375/api/Carts/${id}`,{headers});
         const itemToRemove = cart.find((c) => c.id === id);
         const priceChange = -itemToRemove.price * itemToRemove.quantity;
         const newTotalPrice = totalprice + priceChange;
         const newDiscount = newTotalPrice * 0.2;
         settotalprice(newTotalPrice);
         setdiscount(newDiscount);
         setcart( cart.filter((c)=>c.id !=id))
        

        
    } catch (error) {
        console.log(error)
        
    }
}

    return (
        <div className='cartview'>
      <Navbar />
      
      <h4>Shopping Cart</h4>
      <div className='allcartview'>



            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope='col'>Image</th>
                        <th scope="col">Quntity</th>
                        <th scope="col">Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map(c=>{
                            return(
                                 <tr key={c.id}>
                                    <td>{c.name}</td>
                                    <td className='cartimg'><img src={`https://localhost:44375/${c.imageUrl}`}></img></td>
                                    <td className='cartquantity'><p style={{cursor:"pointer"}} onClick={()=>{handleincreasequantity(c.id)}}><AddIcon/></p>
                                        <p >{c.quantity}</p>
                                        <p style={{cursor:"pointer"}}  onClick={()=>{handledecreasequantity(c.id)}}><RemoveIcon/></p>
                                    </td>

                                    <td>${c.price}</td>
                                    <td style={{cursor:"pointer"}} onClick={()=>HandleRemoveitem(c.id)}><DeleteOutlineOutlinedIcon/></td>
                                
                                </tr>

                            )
                        })
                    }
                    
                </tbody>
            </table>
            <div className='totalsummary'>
                <h3>TOTAL</h3>
                <hr/>
                <div className='tot'>
                    <label>SubTotal</label>
                    <p>${ totalprice}</p>
                </div>
                <div className='tot'>
                    <label>Automatic 20% off</label>
                    <p >-${discount}</p>
                </div>
                <div className='tot'>
                    <label>Total</label>
                    <p>${totalprice - discount}</p>
                </div>
                <div className='confirmorder'>
                    <button>CheckOut</button>
                </div>
                <div>
                    
                </div>
                


            </div>
            </div>
          
        </div>
    )
}

export default ViewCart