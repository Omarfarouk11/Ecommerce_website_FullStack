import React, { useEffect, useState } from 'react'
import "../navbar/Navbarstyle.css"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Navbar = () => {
  const[query,setquery]=useState("");
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
  const handlesearch=(e)=>{
    if(e.key==="Enter"){
      window.location.href = `/search/${query}`;
    }
  }

  const token = localStorage.getItem("Token");


  const handleLogout=()=>{
    localStorage.removeItem("Token");
    localStorage.removeItem("Role");
    localStorage.removeItem("Username")
    window.location.href = "/"; 
  }
  console.log(token);
  return (
    <div className='Navbar'>
        <div className='logo'><Link to={"/"}><h3><span>kiki</span>Brand</h3></Link></div>
        <div className='Search'>
          <input type='text'  list="Products"  onKeyDown={handlesearch} value={query} onChange={(e)=>setquery(e.target.value)}   placeholder="What are you looking for?"></input>
          {query.length>0 && <datalist id="Products">
          {Products.map((item, index) => {
            return <option  key={index} value={item.name} />;
          })}
        </datalist>}
        </div>
        <div className='list'>
            <ul className='listitem'>
              
            {token ? (
            <>
              <li><Link to={"/ViewCart"}>Cart <ShoppingCartOutlinedIcon className='carticon'/></Link></li>
              <li><Link to={"/"} onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to={"/RegisterPage"}>Register</Link></li>
              <li><Link to={"/LoginPage"}>Login</Link></li>
            </>
          )}
               { /*<li><Link to={"/ViewCart"}>Cart <ShoppingCartOutlinedIcon className='carticon'/> </Link> </li>
                <li><Link to={"/RegisterPage"}>Register</Link></li>
        <li><Link to={"/LoginPage"} >Login</Link></li>*/}
            </ul>
        </div>        
    </div>
  )
}

export default Navbar