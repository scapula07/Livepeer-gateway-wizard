import React from 'react'

export default function Funding() {
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between'>
             <h5 className='font-bold text-lg'>Fund Your Gateway</h5>
             <button className='bg-[#58815794] py-2 px-4 text-sm font-bold '>Connect Wallet</button>
        </div>
        <div>

        </div>

        <div className='flex flex-col items-center space-y-4 py-6'>
              <input 
                placeholder='Deposit fund'
                className='w-1/2 border border-black py-2 px-4'
               />
              <input  
                placeholder='Reserve fund'
                className='w-1/2 border border-black py-2 px-4'
               />

               <button className='border-[#58815794] border text-green-800 py-2 px-4 font-bold w-60 '>Proceed</button>
 

        </div>

    </div>
  )
}
