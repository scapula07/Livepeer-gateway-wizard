import React,{useState} from 'react'
import { MdRadioButtonChecked,MdRadioButtonUnchecked } from "react-icons/md";
import { DeploymentParams } from '@/lib/api/types';

export default function Configuration({data,setData}:{data:DeploymentParams,setData:any}) {
  return (
    <div className='w-full h-full space-y-4'>
         <h5 className='text-xl font-semibold'>Specify Details</h5>
         <div className='w-full min-h-[50px] bg-white shadow border  py-2'>
            <div className='px-4 border-b py-2'>
                <h5 className=' font-semibold font-mono text-[0.96rem]'> Gateway Name</h5>
                <h5 className='text-xs'>Your gateway name...</h5>
                <div className='w-full py-2'>
                    <input 
                        className='w-full border py-1 rounded-sm outline-green-500 px-4 text-xs h-10'
                        value={data?.gateway_name}
                        onChange={(e)=>setData({...data,gataway_name:e.target.value})}
                    />
                </div>
                </div>
            <div className='px-4 border-b py-2'>
               <h5 className=' font-semibold font-mono text-[0.96rem]'> RPC URL</h5>
               <h5 className='text-xs'>Arbitrum mainnet rpc url</h5>
               <div className='w-full py-2'>
                  <input 
                    className='w-full border py-1 rounded-sm outline-green-500 px-4 text-xs h-10'
                    value={data?.rpc_url}
                    onChange={(e)=>setData({...data,rpc_url:e.target.value})}
                  />
               </div>
            </div>

                <div className='px-4  py-2'>
                <h5 className=' font-semibold font-mono text-[0.96rem]'> Your password</h5>
                <h5 className='text-xs'>Keep this password handy.Make sure to never share or lose access to either the password.</h5>
                <div className='w-full py-2 flex space-x-3'>
                    <input 
                        className='w-full border py-1 rounded-sm outline-green-500 px-4 text-xs h-10'
                        placeholder='Enter password '
                        value={data?.password}
                        onChange={(e)=>setData({...data,password:e.target.value})}
                      />
                     <input 
                        className='w-full border py-1 rounded-sm outline-green-500 px-4 text-xs h-10'
                        placeholder='Confirm password '
                    />
                </div>
                </div>
          </div>
    </div>
  )
}


