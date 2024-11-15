import React from 'react'
import style from "../pages/regular.module.css"

function SearchAndUsers() {
  return (
    <div className='w-screen h-full pl-2 pr-2 flex flex-col gap-y-3'>
        <input type="text" placeholder='Search users...' className={`w-1/3 p-1 rounded-md  ${style.border} mt-1 mb-1`} />


        <div className="user w-full flex justify-between">
            <div className="flex w-fit h-fit items-center gap-x-2">
                <div className="tagName w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">H</div>
                <h1 className='font-semibold text-sm'>Harkirat Singh</h1>
            </div>
            <button className='p-1 px-4 cursor-pointer text-white bg-black font-semibold text-sm rounded-md'>Send Money</button>
        </div>

        

    </div>
  )
}

export default SearchAndUsers
