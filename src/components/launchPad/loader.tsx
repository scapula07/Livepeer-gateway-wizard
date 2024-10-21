import React from 'react'
import GridLoader from "react-spinners/GridLoader"
import { DeploymentParams } from '@/lib/api/types';

export default function Loader({data}:{data:DeploymentParams}) {
  return (
    <div className='w-full h-[50vh] py-20'>
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
    
    </div>
  )
}
