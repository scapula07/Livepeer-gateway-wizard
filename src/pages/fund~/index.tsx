import React, { useState } from 'react'
import useWeb3Provider from '@/hooks/useWeb3';
import { fundDepositAndReserve,fundDepositAndReserveFor,getSenderInfo,withDraw } from '@/lib/tickercontract';
import { useEffect } from 'react';
import { FundParams } from '@/lib/api/types';
import Header from '@/components/fund/header';
import Modal from '@/components/modal';
import Withdraw from '@/components/fund/withdraw';
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegMinusSquare } from "react-icons/fa";

export default function Fund() {
     const { connectWallet,walletState } = useWeb3Provider();
     const [fund,setFund]=useState <FundParams>() 
     const [trigger,setTrigger]=useState(false)

     useEffect(()=>{
        walletState?.address&&fetchSenderInfo()
     },[walletState?.address])

     const fundGateway=async(total:string,deposit:string,reserve:string)=>{
       try{
       
          const response =await fundDepositAndReserve(total,deposit,reserve)
         }catch(e){ }
      }
    

     const fundGatewayFor=async(total:string,deposit:string,reserve:string,address:string)=>{
      console.log(deposit,reserve,total,address)

      try{
         const response =await fundDepositAndReserveFor(total,deposit,reserve,address)
        }catch(e){ }
     }


    const fetchSenderInfo=async()=>{
       try{
          const response=await getSenderInfo(walletState.address?walletState.address:'')
          setFund(response)
        }catch(e){
           console.log(e)
         }
    }

 
  return (
    <>
            <div className='w-full'>
                <Header walletState={walletState} connectWallet={connectWallet}/>
                <div className='flex space-x-8 justify-center py-28'>
                      <div className='flex flex-col border h-20 w-44 px-3 py-1 space-y-5 rounded-sm'>
                        <h5>Reserve</h5>
                        <h5 className='text-center text-green-500 font-bold'>{fund?.reserve} ETH</h5>
                      </div>
                      <div className='flex flex-col border h-20 w-44 px-3 py-1 space-y-5 rounded-sm'>
                        <h5>Deposit</h5>
                        <h5 className='text-center text-green-500 font-bold '>{fund?.deposit} ETH</h5>
                      </div>

                </div>
                <h5 className='text-center hover:underline hover:text-green-600 text-xl font-light' onClick={()=>setTrigger(true)}>Withdraw your ETH</h5>
                  {[
                     {
                       label:"Fund Gateway",
                       fund:fundGateway,
                     },
                     {
                      label:"Fund Gateway For",
                      fund:fundGatewayFor
                    }
                   ].map((item)=>{
                      return(                      
                          <FundGateway item={item}/>
                      )
                   })
                  }
            </div>
          <Modal trigger={trigger} cname="">
               <Withdraw setTrigger={setTrigger} />       
          </Modal>
    </>
  )
}


const FundGateway=({item}:any)=>{
    const [open,setOpen]=useState(false)
    const [ethFund,setFund]=useState({deposit:"",reserve:"",total:""})
    const [gatewayAddress,setAddress]=useState("")
   return(

    <div className='flex flex-col w-full items-center pt-4 w-full'>
          <div className='flex items-center space-x-4'>
              <h5 className='text-xl font-light'>{item.label}</h5>
              {open?
                < FaRegMinusSquare className='text-xl' onClick={()=>setOpen(false)} />
                   :
                <FaRegSquarePlus className='text-xl' onClick={()=>setOpen(true)} />
              }
       
          </div>
          {open&&(
             <div className='flex flex-col items-center space-y-4 py-6 w-full'>
                         <input 
                            placeholder='Deposit and Reserve amount(ETH)'
                            className='w-1/3 border border-black py-2 px-4  outline-green-600'
                            value={ethFund.total}
                            onChange={(e)=>setFund({...ethFund,total:e.target.value})}
                         />
                        <input 
                            placeholder='Deposit amount(ETH)'
                            className='w-1/3 border border-black py-2 px-4  outline-green-600'
                            value={ethFund.deposit}
                            onChange={(e)=>setFund({...ethFund,deposit:e.target.value})}
                         />
                          <input  
                            placeholder='Reserve amount(ETH)'
                            className='w-1/3 border border-black py-2 px-4 outline-green-600'
                            value={ethFund.reserve}
                            onChange={(e)=>setFund({...ethFund,reserve:e.target.value})}
                          />
                          {item.label==="Fund Gateway For"&&(
                             <input 
                                placeholder='Gateway Address'
                                className='w-1/3 border border-black py-2 px-4  outline-green-600'
                                value={gatewayAddress}
                                onChange={(e)=>setAddress(e.target.value)}
                            />
                          )}
           
                <button className='border-[#58815794] border text-green-800 py-2 px-4 font-bold w-60 ' onClick={()=>item?.fund(ethFund?.total,ethFund?.deposit,ethFund.reserve,gatewayAddress)}>Continue</button>
            </div>
             ) }

     </div>
   )
}