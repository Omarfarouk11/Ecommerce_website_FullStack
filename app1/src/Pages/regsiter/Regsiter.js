import React, { useState } from 'react'
import axios from "axios"
import "../regsiter/Regsiterstyle.css"
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const Regsiter = () => {
const[firstname,setfirstname]=useState("");
const[lasttname,setlastname]=useState("");
const[username,setusername]=useState("");
const[address,setaddres]=useState("");
const[city,setcity]=useState("");
const[country,setcountry]=useState("");
const[email,setemail]=useState("");
const[password,setpassword]=useState("");
const[loading,setloading]=useState(false);
const [message,setmessage]=useState("");
const [messagetype,setmessagetype]=useState("");

const handleregister =(e)=>{
e.preventDefault();
setloading(true);
axios.post("https://localhost:44375/api/Auths/Register",
{
 Firstname:firstname,
 Lastname:lasttname,
 username:username,
 email:email,
 password:password,
 Address:address,
 City:city,
 Country:country
}).then(
  response=>{
      setmessage(response.data.message);
      setloading(false);
      setmessagetype("success")
  }).catch(error => {
    console.log(error)
    var errorMessage = error.response ? error.response.data : "An error occurred";
    setloading(false);
    setmessage(errorMessage);
    setmessagetype("error")
});
}
  return (
    <div className='reg'>

     
      <div className='regform'>
        <h3>SignUp</h3>
    
        <form onSubmit={handleregister}>
        <div className='message'>
          {message && <p className={messagetype}>{message}</p> }
      </div>
          <div className='regcontainer'>
            <div className='regrow'>
            <div className='reg_details'>
              <PersonOutlinedIcon/>
            <input type='text' placeholder='Enter Your Firstname' value={firstname}  onChange={(e)=>setfirstname(e.target.value)}></input>

            </div>
            </div>
            <div className='regrow'>

            <div className='reg_details'>
              <PersonOutlinedIcon/>
            <input type='text'  placeholder='Enter Your Lastname'  value={lasttname}  onChange={(e)=>setlastname(e.target.value)}></input>
                   </div>
            </div>
          </div>
          <div className='regcontainer'>
          <div className='regrow'>
            <div className='reg_details'>
              <PersonOutlinedIcon/>
            <input type='text' placeholder='Enter Your Username' value={username}  onChange={(e)=>setusername(e.target.value)}></input>
            </div>
          </div>
          <div className='regrow'>
            <div className='reg_details'>
              <HomeOutlinedIcon/>
            <input type='text' placeholder='Enter Your Address' value={address}  onChange={(e)=>setaddres(e.target.value)}></input>
            </div>
          </div>
          </div>
          <div className='regcontainer'>
            
          <div className='regrow'>
          <div className='reg_details'>
              <LocationCityOutlinedIcon/>
            <input type='text' value={city} placeholder='Enter Your City' onChange={(e)=>setcity(e.target.value)}></input>
            </div>
          </div>
          <div className='regrow'>
          <div className='reg_details'>
              <PublicOutlinedIcon/>
            <input type='text' value={country} placeholder='Enter Your Country' onChange={(e)=>setcountry(e.target.value)}></input>
            </div>
          </div>
          </div>
          <div className='regcontainer'>
          <div className='regrow'>
          <div className='reg_details'>
              <MailOutlineIcon/>
            <input type='email' value={email}  placeholder='Enter Your Email' onChange={(e)=>setemail(e.target.value)}></input>
            </div>
          </div>
          <div className='regrow'>
          <div className='reg_details'>
              <LockOutlinedIcon/>
            <input type='password' value={password} placeholder='Enter Your Password'  onChange={(e)=>setpassword(e.target.value)}></input>
            </div>
          </div>
          </div>
          <div className='btn'>
            <button type='submit' disabled={loading}>SignUp</button>
          </div>
        </form>
        
    </div>
    </div>
  )
}

export default Regsiter