import React from 'react'
import style from "./regular.module.css"

function Send() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className="w-[80vw] sm:w-1/3 lg:1/2 h-fit p-2 px-3 rounded-md shadow-lg shadow-gray-400 bg-white">
            <h1 className='font-bold font-mono text-2xl lg:text-4xl underline w-full text-center'>Send Money</h1>
            <div className="mt-14 flex items-center gap-x-2">
                <div className="circle bg-green-600 rounded-full flex items-center justify-center h-7 w-7 lg:h-9 lg:w-9 font-semibold">A</div>
                <h1 className='text-xl font-semibold md:text-2xl'>Friend's Name</h1>
            </div>
            <h1 className='mt-2 font-medium pl-1 text-sm lg:text-lg'>Amount (in Rs)</h1>
            <form className='flex flex-col items-center'>
              <input type="number" className={`${style.border} rounded-md w-full mt-2 p-2`} placeholder='Enter Amount' />
              <input type="submit" value="Initiate Transfer" className='bg-green-600 text-white font-semibold text-sm lg:text-lg  p-1 px-6 rounded-md mt-3 cursor-pointer ' />
            </form>
        </div>
    </div>
  )
}

export default Send
