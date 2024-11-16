import React, { useEffect } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import SearchAndUsers from '../components/SearchAndUsers'
import style from "./regular.module.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate();

  const privateAuth = async()=>{
    try{
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/user/authRoute',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : localStorage.getItem("PaytmToken")
        },
        data: {},
      });
      if(response.data.prevent)
      {
        navigate("/signup");
      }
    }catch(err)
    {
      console.log(err);
    }
  }

  useEffect(()=>{
    privateAuth();
  },[])

  return (
    <div className={`w-screen h-screen overflow-x-hidden ${style.display}`}>
        <Appbar userName={localStorage.getItem("firstLetter")} />
        <Balance />
        <h1 className='pl-2 text-lg mt-3 font-medium'>Users</h1>
        <SearchAndUsers />
    </div>
  )
}

export default Dashboard
