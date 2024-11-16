import React, { useRef, useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import style from "./regular.module.css";

function Signin() {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [varStore, setStore] = useState({});
  
  const getFormData = async(e) =>{
    // If the string is not empty then call the api otherwise don't call
    // After calling and get the response from the api clear the value of the input field
    // This 2 step will apply for both the signup and signin route
    e.preventDefault();
    try{
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/user/signin',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: username.current.value,
          password: password.current.value,
        },
      });
      // console.log(response);
      // set the token in the localStorage, if exists then replace the token 
      localStorage.setItem("PaytmToken",response.data.token);
      // Store the first letter of the username
      localStorage.setItem("firstLetter",username.current.value[0]);
      // store the response as an object in the state variable
      setStore(response.data);
      // redirect to the "/dashboard" page when all the goes right
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }catch(err)
    {
      console.log(err);
      setStore(err.response.data);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      {Object.keys(varStore).length === 0 ? null :(
        <div className={`w-fit h-fit text-sm p-1 px-5 rounded-sm bg-white font-semibold border-2 border-solid border-black ${style.jukebox} transition-all duration-100 ease-in-out ${varStore.result ? "bg-green-500":"bg-red-500"}`}>{varStore.msg}</div>
      )}
      
      <form onSubmit={(e)=>getFormData(e)} className="bg-white flex flex-col justify-center p-1 rounded-md w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-[15vw] pt-5 pb-3 shadow-lg shadow-slate-400" >
        <h1 className="m-auto text-4xl font-bold underline mb-5">SignIn</h1>

        <InputField dataPlace={username} label="Username" labelText="Username" placeholder="johndoe12" />
        <InputField dataPlace={password} label="Password" labelText="Password" placeholder="xyz@123" />
        <Button value="Signin" />
        <Link to='/signup' className="text-xs font-semibold w-full text-center mt-1">Don't have an account ? <span className="text-blue-600 underline font-bold text-sm cursor-pointer ">SignUp</span> </Link>
      </form>
    </div>
  )
}

export default Signin
