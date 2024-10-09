import React from 'react'
import { IoBalloon } from "react-icons/io5";

export default function Header() {
  return (
    <div className='w-full fixed px-10 py-4  z-20  '>
         <div className='flex items-center w-full'>
             <div className='w-1/2'>
                  <div className='bg-[#58815794] w-20 h-20 flex items-center justify-center rounded-full'>
                     <h5 className='text-6xl font-semibold text-[#1E1E1E]'>G</h5>
                  </div>
             </div>

             <div className='w-1/2 flex items-center space-x-6 justify-end'> 
                    <h5 className='font-semibold '>Home</h5>
                    <h5 className='font-light '>Blog</h5>
                    <h5 className='font-light '>Contact us</h5>   
                    <button className='border bg-[] px-6 py-1.5 border-[#1E1E1E]'>Sign in</button>         
            </div> 

         </div>

    </div>
  )
}
