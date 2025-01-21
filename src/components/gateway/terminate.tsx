import React from 'react'
import { GrNodes } from "react-icons/gr";

export default function Terminate() {
  return (
    <div className='w-full h-full flex  justify-center'>
            <div className='flex flex-col w-[80%] bg-white h-96 shadow '>
                  <div className='flex flex-col w-full items-center justify-center  h-full space-y-4'>
                        <GrNodes className='text-3xl text-[#58815794] ' />
                        <h5 className='font-bold text-lg'>Are you sure you want to Terminate your Gateway</h5>
                        <div className='flex items-between space-x-4 py-4'>
                            <button className='bg-red-500 py-2 px-6 text-white'>Continue</button>
                            <button className='text-[#58815794] border border-[#58815794]  py-2 px-6'>Cancel</button>


                        </div>
                  </div>
            </div>

    </div>
  )
}
