import React,{useContext,useState,useEffect} from 'react'
import {store} from './App';
import { useNavigate } from 'react-router';
import axios from 'axios';


const Myprofile = () => {
    const [token,setToken] = useContext(store);
    const navigate = useNavigate();
    const [data,setData] = useState(null);
    useEffect(() =>{
        axios.get('http://localhost:5000/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(
            res=>{
                setToken(res.token)
                setData(res.data)
            }
        )
        
        
       
  
    })
    // if(!token){
    //     navigate("/login")
    //  }
    return (
        <div>

   
{ data && 

<center>
     Welcome user : {data.username}
</center>

 }
        </div>
    )
}

export default Myprofile