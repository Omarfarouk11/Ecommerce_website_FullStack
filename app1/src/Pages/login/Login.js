import axios from 'axios';
import React, { useState } from 'react'
import "../login/Loginstyle.css"
import { Link, useNavigate } from 'react-router-dom';
import img from "../../assests/bgloginnew.png"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
const Login = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [message, setmessage] = useState("");
    const [messagetype, setmessagetype] = useState("")
    const role = JSON.parse(localStorage.getItem("Role"));
    const handlelogin = (e) => {
        e.preventDefault();
        axios.post("https://localhost:44375/api/Auths/Login", {
            email: email,
            password: password
        }).then(
            response => {
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("Role", JSON.stringify(response.data.roles.$values[0]));
                localStorage.setItem("Username", response.data.username);
                setmessage(response.data.message)
                setmessagetype("success")
           
                if(role.includes("Admin")){
                    window.location.href="/admin"
                }
                else{
                    window.location.href="/"
                }

            }
        ).catch(error => {
            setmessage(error.response.data)
            setmessagetype("error")
        })
    }
    return (
        <div className='login'>




            <form onSubmit={handlelogin}>
                <div className='bg_login'>
                    <img src={img} alt='bg_img'></img>
                </div>
                <div className='loginform'>
                    <div className='weltitle'>
                        <h2>Welcome To kikiBrand</h2>
                        <h6>Ship Smarter Today</h6>
                    </div>
                    {message && <p className={messagetype}>{message}</p>}
                    <div className='rowlogin'>
                        <label>Email</label>
                        <div className='login_details'>
                            <MailOutlineIcon className='loginicons' />
                            <input type='email' placeholder='Enter Your Email' value={email} onChange={(e) => { setemail(e.target.value) }} ></input>

                        </div>
                    </div>
                    <div className='rowlogin'>
                        <label>Password</label>
                        <div className='login_details'>
                            <LockOutlinedIcon className='loginicons' />
                            <input type='password' placeholder='Enter Your Password' value={password} onChange={(e) => { setpassword(e.target.value) }}></input>

                        </div>
                    </div>
                    <div className='btn'>
                        <button type='submit'>Login<LoginOutlinedIcon/></button>
                    </div>
                    <div className='accountnotexists'>
                        <p>Don't have Account?</p>
                        <Link to="/RegisterPage">SignUp</Link>

                    </div>
                </div>

            </form>

        </div>

    )
}

export default Login