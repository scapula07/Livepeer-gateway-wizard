import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Bottomsection() {
    const {replace}=useRouter()
  return (
    <div className='w-full'>
        <div className='bg-[#DAD7CD] flex flex-col items-center w-full py-20  space-y-14 '>
              <div className='flex flex-col space-y-4 font-light '>
                    <h5 className='w-full text-4xl'>  You dont need to spend Hundred of</h5>
                    <h5 className='w-full text-4xl '>
                       <span className='bg-[#588157] text-white font-semibold px-3 py-2 text-3xl'> Thousands of Bucks </span>  to disrupt the </h5>  
                    <h5 className='text-4xl w-full text-center'>Media Space</h5>
              </div>

              <h5>Run Low cost Media Infrastructure</h5>
            
                 <button className='bg-[#344E41] text-white font-semibold py-5 w-1/5'
                   onClick={()=>replace('/auth/signup')}
                  >
                  Launch Gateway
                </button>     
              
              
                          
        </div>

    </div>
  )
}
