import React, { useEffect, useRef, useState } from 'react'
import style from "./regular.module.css"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";

function Send() {

  const navigate = useNavigate();
  // Check if the authToken is present or not
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

  const moneyQuantity = useRef(Number);
  const [varStore, setVarStore] = useState({
    msg: '',
    result : false
  }); 

  const location = useLocation();
  const {id, firstname, lastname} = location.state || {};

  



  const sendingMoney = async(e)=>{
    e.preventDefault();
    if(moneyQuantity.current.value != "" && moneyQuantity.current.value >0)
    {
      try{
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3000/api/v1/account/transfer-money',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem("PaytmToken"),
          },
          params: {},
          data: {
            amt: moneyQuantity.current.value,
            to: id
          },
        });
        // Set the respone on the "useState" variable 
        setVarStore({
          msg: response.data.msg,
          result : response.data.result
        })
        // Input field should be null after receiving the amount
        moneyQuantity.current.value = null;
      }catch(err)
      {   
        console.log("Unable to tranfer amount");
      }
    }
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>

      {varStore.msg.length <=0 ? null :(
        <div className={`w-fit h-fit text-sm p-1 px-5 rounded-sm font-semibold border-2 border-solid border-black ${style.jukebox} transition-all duration-100 ease-in-out ${varStore.result ? "bg-green-500":"bg-red-500"}`}>{varStore.msg}</div>
      )}

        <div className="w-[80vw] sm:w-1/3 lg:1/2 h-fit p-2 px-3 rounded-md shadow-lg shadow-gray-400 bg-white">
            <h1 className='font-bold font-mono text-2xl lg:text-4xl underline w-full text-center'>Send Money</h1>
            <div className="mt-14 flex items-center gap-x-2">
                <div className="circle bg-green-600 rounded-full flex items-center justify-center h-7 w-7 lg:h-9 lg:w-9 font-semibold">{firstname ? firstname[0] : "k"}</div>
                <h1 className='text-xl font-semibold md:text-2xl'>{firstname}{" "}{lastname}</h1>
            </div>
            <h1 className='mt-2 font-medium pl-1 text-sm lg:text-lg'>Amount (in Rs)</h1>
            <form onSubmit={(e)=>sendingMoney(e)} className='flex flex-col items-center'>
              <input type="number" ref={moneyQuantity} className={`${style.border} rounded-md w-full mt-2 p-2`} placeholder='Enter Amount' />
              <input type="submit" value="Initiate Transfer" className='bg-green-600 text-white font-semibold text-sm lg:text-lg  p-1 px-6 rounded-md mt-3 cursor-pointer ' />
            </form>
        </div>
    </div>
  )
}

export default Send
