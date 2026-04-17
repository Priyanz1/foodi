import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useFoodPartner } from '../Context/FoodPartnerContext';

function FPProtectedWrapper({children}) {
   
    const [isloading,setisloading]=useState(true);
    const {foodpartner, setfoodpartner } = useFoodPartner();
    const navigate=useNavigate();
   useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token){
      navigate("/foodpartnerlogin");
      setisloading(false);
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/api/foodpartner/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }).then((response) => {
        if (response.status === 200) {
          setfoodpartner(response.data); 
          setisloading(false);   
        }
      }).catch((err) => {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/foodpartnerlogin');
        setisloading(false);
      });
   }, [navigate, setfoodpartner]);

   if(isloading){
    return(
      <div>is loading...</div>
    )
   }

  return (
    <div>{children}</div>
  )
}

export default FPProtectedWrapper;