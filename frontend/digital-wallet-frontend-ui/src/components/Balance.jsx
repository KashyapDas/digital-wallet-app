import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";

const Balance=React.memo(()=> {

  const [balance, setBalance]= useState(Number);

  const getBalance= async()=>{
    try{
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/account/check-balance',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem("PaytmToken"),
        },
        params: {},
        data: {},
      });
      setBalance(response.data.userBalance);
    }catch(err)
    {
      console.log(err);
    }
  }

  useEffect(()=>{
    getBalance();    
  },[]);

  return (
    <h1 className='p-2 pt-3 pb-3 font-semibold text-lg'>Your balance : <span className='ml-2'>Rs.{Math.floor(balance)}</span></h1>
  )
})

export default Balance
