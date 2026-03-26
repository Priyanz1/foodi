import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useUserData } from '../Context/UserDataContext';

function UserProtectedWrapper({children}) {
   
    const token=localStorage.getItem('token');
    const [isloading,setisloading]=useState(true);
    const { user,setuser } = useUserData();
    const navigate=useNavigate();
   useEffect(()=>{
    if(!token){
      navigate("/login");
      setisloading(false);
      return;
    }

    axios.get("http://localhost:3000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
        if (response.status === 200) {
          setuser(response.data); 
          setisloading(false);   
        }
      }).catch((err) => {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      });
   }, [token]);

   if(isloading){
    return(
      <div>is loading...</div>
    )
   }

  return (
    <div>{children}</div>
  )
}

export default UserProtectedWrapper;