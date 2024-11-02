import React from 'react'
import { gatewayStore,userStore } from '@/recoil'
import { useRecoilValue } from 'recoil'
import { BeatLoader, ClipLoader } from 'react-spinners'
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { LiaDownloadSolid } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";


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
  }

export default function Dashboard() {
     const gateway=useRecoilValue(gatewayStore) as GATEWAY
     const user=useRecoilValue(userStore)
     console.log(gateway,"gg")
   return (
    <div className='w-full h-full flex flex-col space-y-10'>
          <h5 className='font-semibold text-3xl'>Hello bartholomew Onogwu!👋</h5>
          <div className='w-full flex justify-between space-x-4'>
              <div className='w-[65%] '> 
                <div className=" w-full flex flex-col space-y-6">
                   
                      <div className='flex justify-between items-center' >
                          {
                             [ 
                              "IP Address",
                              '',
                              "Type",
                              "Creation date",
                              ""
                              
                              ].map((text)=>{
                                return(
                                <h5 className='text-sm text-left font-semibold'>{text}</h5>
                                )
                              })
                             }
                        </div>     
                     
                   
                            <div className='flex items-center justify-between bg-white rounded-xl text-slate-800  text-xs font-semibold px-6 py-7 shadow'>
                                {gateway?.ip?.length>0?
                                   <h5 className='text-left flex items-center space-x-2'>
                                         <TbWorld 
                                           className='text-[#58815794] text-2xl'
                                         />
                                         <span>{gateway?.ip}</span>
                                     </h5>
                                     :
                                     <BeatLoader
                                       size={8}
                                       color='#58815794'
                                     />
                                }
                          
                                <h5></h5>
                                <h5 className='text-left'>{gateway?.type}</h5>
                                <h5 className='text-left'>1/11/2024</h5>
                                <BsThreeDotsVertical />                             
                            </div>
                       
                </div>


              </div>
               <GatewayDetails 
                  gateway={gateway}
                />
          </div>

    </div>
  )
}



const GatewayDetails=({gateway}:{gateway:GATEWAY})=>{
     return(
        <div className='w-[45%] flex flex-col bg-white  py-6 px-4 rounded-lg space-y-4'>
              <div className='flex items-center justify-between'>
                    <p className='font-semibold'>Node Status</p>
                    {gateway.status !='running'?
                      <div className='flex items-center space-x-1.5 bg-gray-200 py-2 px-4 rounded-full'>
                           <ClipLoader
                               color='gray'
                               size={16}
                               />
                           <p className='text-sm'>Initializing</p>
                       </div>   
                           :
                       <div className='flex items-center space-x-1.5 bg-orange-200 py-2 px-4 rounded-full'>
                         <GoDotFill className='text-orange-600 text-xl'/>
                        <p className='text-sm text-orange-700 font-semibold'>Running</p>
                      </div>   
                   }    
               </div>
               <div className='w-full flex justify-center'>
                    <img 
                    src='/img.png'
                    className='w-36 h-36'
                    />

              </div>
              <div className='w-full justify-center flex'>
                   <button className='border border-gray-200 py-3 px-8 font-semibold rounded-full space-x-3 w-[80%] text-xs flex items-center justify-center'>
                        <LiaDownloadSolid className='text-xl'/>
                        <span>  Download Keystore</span>
                   </button>
                 
              </div>

        </div>
     )
}