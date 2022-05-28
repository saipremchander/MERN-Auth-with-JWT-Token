import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios';
import {store} from './App';
import { useNavigate } from 'react-router';


const Login = () => {

    const updateuser = (token)=>{
        localStorage.setItem("localtoken",JSON.stringify(token))
        setToken(token)
        }
        
        useEffect(()=>{
        
            localStorage.getItem("localtoken")
        },[])


    const [token,setToken] = useContext(store)


  
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:'',
        password:'',
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
            res => {
                updateuser(res.data)
            navigate("/myprofile")
            }
        )
    }
    if(token){
        navigate("/myprofile")
    }
    return (
        <div>
            <center>
            <form onSubmit={submitHandler} >
                <h3>Login</h3>
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" /><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password" /><br />
                <input type="submit" value="Login" /><br />
            </form>
            </center>
        </div>
    )
}

export default Login