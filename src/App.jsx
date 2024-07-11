import React, { useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'

export const App = () => {
 
  return (
    <>
    <div className='flex flex-row justify-center '> 
      <div className='border-4 border-solid border-sky-950 rounded-md mt-10 bg-sky-950	'>
      <h1  
      className=' text-center text-6xl  font-serif text-white listTop border-b border-white  mb-10 pb-3' >
        To-Do List</h1>

      < InputBox />
      
      </div>
      </div>
     
    </>
  )
}



