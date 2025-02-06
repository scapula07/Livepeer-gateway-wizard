import React,{useState} from 'react'
import { GrNodes } from "react-icons/gr";
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';
import { _deleteTerminal } from '@/lib/api/gateway.api';
import { gatewayStore,userStore } from '@/recoil'
import { useRecoilValue } from 'recoil'

type GATEWAY={
  id:string
  creator:string,
  createdAt:string,
  title:string,
  cover:string,
  rpcUrl:string,
  type:string,
  status:string
  ip:string
  dashboardUrl:string
}

export default function Terminate() {
       const [passphrase,setPassphrase]=useState('')
       const [isLoading,setLoading]=useState(false)
       const gateway=useRecoilValue(gatewayStore) as GATEWAY


       const deleteGateway=async()=>{
              setLoading(true)
             try{
              const response= await _deleteTerminal({...gateway,passphrase})
              response?.data&&setLoading(false)

             }catch(e){
              setLoading(false)

             }
       }
  return (
    <div className='w-full h-full flex  justify-center'>
            <div className='flex flex-col w-[80%] bg-white h-96 shadow '>
                  <div className='flex flex-col w-full items-center justify-center  h-full space-y-4 px-8'>
                        <GrNodes className='text-3xl text-[#58815794] ' />
                        <h5 className='font-bold text-sm'>Confirm that you want to delete this Gateway by typing its Passphrase:</h5>
                        <input 
                         required
                         className='w-full border py-2 outline-green-200 px-4'
                         onChange={(e)=>setPassphrase(e.target.value)}
                        />
                        <div className='flex items-center space-x-10 py-4'>
                         {isLoading?
                                 <ClipLoader color='' size={30}/>
                                 :
                            <button className='bg-red-500 py-2 px-6  text-white'
                              onClick={!isLoading?deleteGateway:undefined}
                            >
                                     Continue
                            </button>
                                 
                         }
                            <button className='text-[#58815794] border border-[#58815794]  py-2 px-6'>Cancel</button>
                        </div>
                  </div>
            </div>

    </div>
  )
}
