import React from 'react'
import { IoBalloon } from "react-icons/io5";
import Link from 'next/link';

export default function Header({walletState,connectWallet}:any) {
  return (
    <div className='w-full fixed px-10 py-4  z-20  '>
         <div className='flex items-center w-full'>
             <div className='w-1/2'>
                  <div className='bg-[#58815794] w-20 h-20 flex items-center justify-center rounded-full'>
                     <h5 className='text-6xl font-semibold text-[#1E1E1E]'>G</h5>
                  </div>
             </div>

             <div className='w-1/2 flex items-center space-x-6 justify-end'> 
                    <Link href="/fund">
                       <h5 className='font-light '>Home</h5>
                    </Link>
                    <Link href="/fund">
                        <h5 className='font-semibold '>Fund A Gateway</h5>
                    </Link>
                    <h5 className='font-light '>Blog</h5>
                    <h5 className='font-light '>Contact us</h5>   
                
                  <button className='bg-[#58815794] py-2 px-4 text-sm font-bold ' onClick={connectWallet}>
                     {!walletState.address?"Connect Wallet":walletState.address?.slice(0,10)+ "..."}
                  </button>         
            </div> 
         </div>
    </div>
  )
}
