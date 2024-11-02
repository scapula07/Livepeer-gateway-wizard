import React,{ReactNode} from 'react'
import Navbar from "../../components/navbar"
import Panel from "./panel"

type Props={
    children:ReactNode
}
export default function Layout({children}:Props) {
  return (
    <div className='w-full h-screen font-mono bg-[#f9f9f9]'>      
          <Navbar/>
           <div className='w-full h-full flex justify-center py-5'>
                <div className='w-[95%] h-full flex space-x-10'>
                     <div className='w-1/3 h-full'>
                         <Panel />
                     </div>
                     <div className='w-full  oveflow-y-scroll h-screen no-scrollbar bg-[#f9f9f9]'>
                          {children}      
                     </div>
                </div>
          </div>
    </div>
  )
}
