import React, { useRef } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

function Signin() {
  const username = useRef();
  const password = useRef();
  
  const getFormData = (e) =>{
    // If the string is not empty then call the api otherwise don't call
    // After calling and get the response from the api clear the value of the input field
    // This 2 step will apply for both the signup and signin route
    e.preventDefault();
    console.log("The username is "+typeof username.current.value)
    console.log("The password is "+password.current.value)
    
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
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
