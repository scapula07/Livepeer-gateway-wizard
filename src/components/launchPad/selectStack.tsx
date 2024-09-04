import React,{useState} from 'react'
import { MdRadioButtonChecked,MdRadioButtonUnchecked } from "react-icons/md";

export default function SelectStack() {
     const [type,setType]=useState("")
  return (
    <div className='w-full h-full space-y-4'>
         <h5 className='text-xl font-semibold'>Select Stack</h5>
         <div className='w-full min-h-[50px] bg-white shadow border  py-2'>
            <div className='px-4 border-b py-2'>
               <h5 className=' font-semibold font-mono text-[0.96rem]'> Choose a type</h5>
               <h5 className='text-xs'>You can also create a template by scanning your existing resources in the</h5>
            </div>
            <div className='w-full py-4 flex flex-col px-4 space-y-4'>
                    <div className='w-full'>
                        <h5 className=' font-semibold font-sans text-[0.8rem] text-slate-600'> Choose a type</h5>
                        <h5 className='text-xs'>You can also create a template by scanning your existing resources in the</h5>
                     </div>
                     <div className='w-full flex space-x-4'>
                        {[
                            {
                                label:" Livepeer gateway",
                                desc:"Launch a Livepeer gateway"
                            },
                            {
                                label:" Livepeer Catalyst ",
                                desc:"Start a media server with a Livepeer Catalyst"
                            }

                          ].map((tab)=>{
                             return(
                                <div className=' flex border px-4 py-4 space-x-2'>
                                {
                                   type===tab?.label?
                                    <MdRadioButtonChecked
                                      className='text-green-500'
                                      onClick={()=>setType(tab?.label)} 
                                     />
                                    :
                                    <MdRadioButtonUnchecked
                                      className='text-green-500'
                                      onClick={()=>setType(tab?.label)} 
                                     />
                                }
                              
                                <div className='flex flex-col'>
                                    <h5 className='text-xs font-semibold'>{tab?.label}</h5>
                                    <h5 className='text-[0.7rem] text-slate-600'>{tab?.desc}</h5>
                                </div>
                    
                           </div>
                             )
                           })
                           }
                     </div>
                 </div>
             </div>



         <div className='w-full min-h-[50px] bg-white shadow border  py-2'>
            <div className='px-4 border-b py-2'>
               <h5 className=' font-semibold font-mono text-[0.96rem]'> Select cloud provider</h5>
               <h5 className='text-xs'>You can also create a template by scanning your existing resources in the</h5>
            </div>
            <div className='w-full py-4 flex flex-col px-4 space-y-4'>
                    <div className='w-full'>
                        <h5 className=' font-semibold font-sans text-[0.8rem] text-slate-600'> Choose a ty</h5>
                        <h5 className='text-xs'>You can also create a template by scanning your existing resources in the</h5>
                     </div>
                     <div className='w-full flex space-x-4'>
                        {[
                            {
                                label:" AWS",
                                desc:"Launch a Livepeer gateway"
                            },
                            {
                                label:"GCP",
                                desc:"Start a media server with a Livepeer Catalyst"
                            },
                            {
                                label:"Dedicated Service",
                                desc:"Start a media server with a Livepeer Catalyst"
                            }

                          ].map((tab)=>{
                             return(
                                <div className=' flex border px-4 py-4 space-x-2'>
                                {
                                   type===tab?.label?
                                    <MdRadioButtonChecked
                                      className='text-green-500'
                                      onClick={()=>setType(tab?.label)} 
                                     />
                                    :
                                    <MdRadioButtonUnchecked
                                      className='text-green-500'
                                      onClick={()=>setType(tab?.label)} 
                                     />
                                }
                              
                                <div className='flex flex-col'>
                                    <h5 className='text-xs font-semibold'>{tab?.label}</h5>
                                    <h5 className='text-[0.7rem] text-slate-600'>{tab?.desc}</h5>
                                </div>
                    
                           </div>
                             )
                           })
                           }
                     </div>
                 </div>


                        <div className='w-full py-4 flex flex-col px-4 space-y-4'>
                            <div className='w-full'>
                                <h5 className=' font-semibold font-sans text-[0.8rem] text-slate-600'> Choose region</h5>
                                <h5 className='text-xs'>You can also create a template by scanning your existing resources in the</h5>
                            </div>
                            <div className='w-full grid grid-cols-2 gap-2'>
                                {[
                                    {
                                        label:"Amsterdam",
                                        desc:"Launch a Livepeer gateway"
                                    },
                                    {
                                        label:"Germany",
                                        desc:"Start a media server with a Livepeer Catalyst"
                                    },
                                    {
                                        label:"Franfurt",
                                        desc:"Start a media server with a Livepeer Catalyst"
                                    }

                                ].map((tab)=>{
                                    return(
                                        <div className=' flex border px-4 py-4 space-x-2'>
                                        {
                                        type===tab?.label?
                                            <MdRadioButtonChecked
                                            className='text-green-500'
                                            onClick={()=>setType(tab?.label)} 
                                            />
                                            :
                                            <MdRadioButtonUnchecked
                                            className='text-green-500'
                                            onClick={()=>setType(tab?.label)} 
                                            />
                                        }
                                    
                                        <div className='flex flex-col'>
                                            <h5 className='text-xs font-semibold'>{tab?.label}</h5>
                                            <h5 className='text-[0.7rem] text-slate-600'>{tab?.desc}</h5>
                                        </div>
                            
                                </div>
                                    )
                                })
                                }
                            </div>
                        </div>
             </div>




    </div>
  )
}


