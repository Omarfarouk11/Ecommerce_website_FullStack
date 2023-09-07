import { useEffect, useState } from 'react'
import axios from 'axios'
import "../products/Productsstyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
const Products = () => {
  const [Products, setProdcuts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("https://localhost:44375/api/Products");
        setProdcuts(result.data.$values);
        console.log(result.data.$values)
      
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();

  }, []);

  const handlecart=(id)=>{

    try {
      const token = localStorage.getItem('Token'); // Get the authorization token from local storage
      const headers = { Authorization: `Bearer ${token}` };
      const result =axios.post(`https://localhost:44375/api/Carts/${id}`,null,{headers})
      console.log(result.data);
     
      
    } catch (error) {
      console.log(error);
      
    }

  }



  return (
    <div className='productcontainer'>

      <div className='Product'>
       
        {Products.length > 0
          ? Products.map((P) => (
              <div className='ProductDetails' key={P.id}>
               <div className='ProductImg'>
             
               <Link to={`/ViewOneProduct/${P.id}/${P.categoryId}`}><img  src={`https://localhost:44375/${P.imageUrl}`} alt='img1'></img> </Link>
                </div>
               
                <div className='ProductName'>
                  <h5>{P.name}</h5>
                </div>
                <div className='ProductPrice'>
                  <div>
                  <h5>${P.price}</h5>
                  </div>
                  <div className='cartineachproduct'>
                    {/*
                      P.stock===0 ?
                    <p>Item Is Not avaliable now </p>  :
                    <button   onClick={()=>handlecart(P.id)} >< ShoppingCartIcon className='carticonadd' /></button>*/
                    }
                  
                  </div>
                  
                
                </div>
              </div>
         
         
          ))
          : <div>No products found.</div>}

      </div>





    </div>
  )

          }
export default Products