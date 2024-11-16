import React, { useEffect, useRef, useState } from 'react'
import style from "../pages/regular.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchAndUsers() {

  const search = useRef();
  const [res,setRes] = useState([]);

  const getAllUSers =async ()=>{
    try{
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/user/getAllUsers',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("PaytmToken"),
        },
        params: {
          filter : search.current.value
        },
        data: {},
      });
      // console.log(response);
      setRes(response.data.list);
      
    }catch(err)
    {
      console.log(err);
    }
  }

  function getData(){
    getAllUSers();
  }

  const navigate = useNavigate();
  const navigateLink = (items,e)=>{
      e.preventDefault();
      // send the items object to the another page using the body not through the query params
      navigate("/send", {
        state: {
            id: items._id,
            firstname: items.firstname,
            lastname: items.lastname
        }
    });
  }

  return (
    <div className='w-screen h-full pl-2 pr-2 flex flex-col gap-y-3'>
        <input ref={search} onChange={getData} type="text" placeholder='Search users...' className={`w-1/3 p-1 rounded-md  ${style.border} mt-1 mb-1`} />

        {res.length>0 ? res.map((items,index)=>(
            <div key={index} className="user w-full flex justify-between">
            <div className="flex w-fit h-fit items-center gap-x-2">
                <div className="tagName w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">H</div>
                <h1 className='font-semibold text-sm'>{items.firstname}{" "}{items.lastname}</h1>
            </div>
            <button onClick={(e)=>navigateLink(items,e)} className='p-1 px-4 cursor-pointer text-white bg-black font-semibold text-sm rounded-md'>Send Money</button>
            </div>
        )) : "No user Found" }

        {/* <div className="user w-full flex justify-between">
            <div className="flex w-fit h-fit items-center gap-x-2">
                <div className="tagName w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">H</div>
                <h1 className='font-semibold text-sm'>Harkirat Singh</h1>
            </div>
            <button className='p-1 px-4 cursor-pointer text-white bg-black font-semibold text-sm rounded-md'>Send Money</button>
        </div> */}

        

        

    </div>
  )
}

export default SearchAndUsers
