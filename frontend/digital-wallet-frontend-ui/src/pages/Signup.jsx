import React, { useRef, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./regular.module.css"

function Signup() {

  const email = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const username = useRef();
  const password = useRef();

  const [varStore,setStore] = useState({});
  const navigate = useNavigate();

  const getFromData = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/user/signup',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: email.current.value,
          firstname: firstname.current.value,
          lastname: lastname.current.value,
          username: username.current.value,
          password: password.current.value,
        },
      });
      // Set the token in the localStorage
      localStorage.setItem("PaytmToken",response.data.token);
      setStore(response.data);
      // after all happen redirect to the "/dashboard" page
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      // console.error("Error:", error);
      setStore(error.response.data);
    }
  };


  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative ">
      {Object.keys(varStore).length === 0 ? null :(
        <div className={`w-fit h-fit text-sm p-1 px-5 rounded-sm bg-white font-semibold border-2 border-solid border-black ${style.jukebox} transition-all duration-100 ease-in-out ${varStore.result ? "bg-green-500":"bg-red-500"}`}>{varStore.msg}</div>
      )}

      <form onSubmit={(e)=>getFromData(e)} className="bg-white flex flex-col justify-center p-1 rounded-md w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-[15vw] pt-5 pb-3 shadow-lg shadow-slate-400" >
        <h1 className="m-auto text-4xl font-bold underline mb-5">SignUp</h1>

        <InputField dataPlace={email} label="Email" labelText="Email" placeholder="xyz@gmail.com" />
        <InputField dataPlace={firstname} label="Firstname" labelText="FirstName" placeholder="john" />
        <InputField dataPlace={lastname} label="Lastname" labelText="Lastname" placeholder="doe" />
        <InputField dataPlace={username} label="Username" labelText="Username" placeholder="johndoe12" />
        <InputField dataPlace={password} label="Password" labelText="Password" placeholder="xyz@123" />
        <Button value="Signup" />
        <Link to='/signin' className="text-xs font-semibold w-full text-center mt-1">Already have an account ? <span className="text-blue-600 underline font-bold text-sm cursor-pointer ">SignIn</span> </Link>
      </form>
    </div>
  );
}

export default Signup;
