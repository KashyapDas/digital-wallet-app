import React from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import SearchAndUsers from '../components/SearchAndUsers'
import style from "./regular.module.css"

function Dashboard() {
  return (
    <div className={`w-screen h-screen overflow-x-hidden ${style.display}`}>
        <Appbar userName="K" />
        <Balance />
        <h1 className='pl-2 text-lg mt-3 font-medium'>Users</h1>
        <SearchAndUsers />
    </div>
  )
}

export default Dashboard
