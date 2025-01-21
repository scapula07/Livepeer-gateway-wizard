import React, { useState } from 'react'
import useWeb3Provider from '@/hooks/useWeb3';
import { fundDepositAndReserve,getSenderInfo } from '@/lib/tickercontract';
import { useEffect } from 'react';
import { FundParams } from '@/lib/api/types';

export default function Funding() {
     const { connectWallet,walletState } = useWeb3Provider();
     const [fund,setFund]=useState <FundParams>() 

     useEffect(()=>{
        walletState?.address&&fetchSenderInfo()
     },[walletState?.address])

   //   const fundGateway=async()=>{
   //     try{
   //        const response =await fundDeposit("0.01")
   //       }catch(e){ }
   //    }

    const fetchSenderInfo=async()=>{
       try{
          const response=await getSenderInfo(walletState.address?walletState.address:'')
          console.log(response,"response")
          setFund(response)
        }catch(e){
           console.log(e)
        }
    }

 
  return (
    <div className='w-full space-y-8'>
        <div className='flex items-center justify-between'>
             <h5 className='font-bold text-lg'>Fund Your Gateway</h5>
             <button className='bg-[#58815794] py-2 px-4 text-sm font-bold ' onClick={connectWallet}>
               {!walletState.address?"Connect Wallet":walletState.address?.slice(0,10)+ "..."}
            </button>
        </div>
        <div className='flex space-x-8 justify-center'>
              <div className='flex flex-col border h-20 w-44 px-3 py-1 space-y-5 rounded-sm'>
                 <h5>Reserve</h5>
                 <h5 className='text-center text-green-500 font-bold'>{fund?.reserve} ETH</h5>
              </div>
              <div className='flex flex-col border h-20 w-44 px-3 py-1 space-y-5 rounded-sm'>
                 <h5>Deposit</h5>
                 <h5 className='text-center text-green-500 font-bold '>{fund?.deposit} ETH</h5>
              </div>

        </div>
        <h5 className='text-center hover:underline hover:text-green-600'>Withdraw your ETH</h5>

        <div className='flex flex-col items-center space-y-4 py-6'>
              <input 
                placeholder='Deposit fund'
                className='w-1/2 border border-black py-2 px-4'
               />
              <input  
                placeholder='Reserve fund'
                className='w-1/2 border border-black py-2 px-4'
               />

               <button className='border-[#58815794] border text-green-800 py-2 px-4 font-bold w-60 ' >Proceed</button>
        </div>

    </div>
  )
}
