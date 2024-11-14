import React, { useRef } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Signup() {

  const email = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const username = useRef();
  const password = useRef();

  const getFromData = (e) =>{
    e.preventDefault();
    console.log(email.current.value, firstname.current.value, lastname.current.value, username.current.value, password.current.value);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
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
