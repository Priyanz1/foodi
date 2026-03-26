import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useFoodPartner } from '../Context/FoodPartnerContext';

function FPProtectedWrapper({children}) {
   
    const token=localStorage.getItem('token');
    const [isloading,setisloading]=useState(true);
    const {foodpartner, setfoodpartner } = useFoodPartner();
    const navigate=useNavigate();
   useEffect(()=>{
    if(!token){
      navigate("/foodpartnerlogin");
      setisloading(false);
      return;
    }

    axios.get("http://localhost:3000/api/foodpartner/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
        if (response.status === 200) {
          setfoodpartner(response.data); 
          setisloading(false);   
        }
      }).catch((err) => {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/foodpartnerlogin');
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

export default FPProtectedWrapper;