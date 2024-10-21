import React from 'react'
import GridLoader from "react-spinners/GridLoader"
import { DeploymentParams } from '@/lib/api/types';
import Confetti from 'react-confetti'
import Link from 'next/link';

export default function Loader({data,isLoading,id}:{data:DeploymentParams,isLoading:boolean,id:string}) {
  return (
    <div className='w-full h-[50vh] py-20'>
          {isLoading?
            <div className='w-full flex flex-col items-center space-y-4'>
                   <GridLoader 
                      color='orange'
                      size={"30px"}
                   />
                  <div className='flex flex-col items-center'>
                       <h5 className='font-semibold'>Launching Your Gateway...</h5>
                       <h5 className='text-sm'>This might take some minutes</h5>
                  </div>
             </div>
             :
             <Deployed 
               id={id}
              />
          }
      
    
    </div>
  )
}


const Deployed=({id}:{id:string})=>{
   return(
      <div className='w-full h-full '>
          <Confetti
            />
            <div className='flex flex-col items-center space-y-10'>
                  <h5 className='font-semibold text-4xl text-slate-700'>Your Gateway is Live<span role="img" aria-label="party-popper">🎉</span></h5>

                  <div className='w-full flex justify-center'>
                       <Link href={`/gateways/${id}/dashboard`} 
                          className="w-1/3"
                        >
                           <button 
                              className='bg-[#A3B18A] w-full py-3 rounded-full font-semibold text-lg' 
                            >
                            Go to Dashboard
                          </button>
                       </Link>
             
                  </div>

            </div>


      </div>
   )
}