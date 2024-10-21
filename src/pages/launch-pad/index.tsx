import React,{useState} from 'react'
import Navigator from '@/components/launchPad/nav'
import Navbar from '@/components/navbar'
import Panel from "../../components/launchPad/panel"
import SelectStack from '@/components/launchPad/selectStack'
import Configuration from '@/components/launchPad/configuration'
import Loader from '@/components/launchPad/loader'
import { _deploy } from '@/lib/api/script.api'
import { DeploymentParams } from '@/lib/api/types'


export default function LaunchPad() {
     const [next,setNext]=useState(1)
     const [data,setData]=useState<DeploymentParams>({
                                    gateway_type:"",
                                    provider:"",
                                    region:"",
                                    gateway_name:"",
                                    rpc_url:"",
                                    password:""
                                 })

     const launch=async()=>{
         try{
            const response =await _deploy(data)
           }catch(e){
             console.log(e)
           }
       }

     return (
     <div className='w-full h-full overflow-y-hidden font-mono'>
          <Navbar />  
          <div className='w-full flex justify-center px-10 h-full overflow-y-scroll'>
               <div className='w-full h-full border-l-2'>
                          <Navigator/>
                       <div className='flex w-full'>
                            <div className='w-1/3 h-full '>
                                <Panel
                                  next={next}
                                />
                            </div>
                            <div className='w-full h-full overlow-y-scroll'>
                                 {next===1&&  <SelectStack data={data} setData={setData}/>}
                                 {next===2&&  <Configuration data={data} setData={setData}/>}
                                 {next===3&&  <Loader data={data} />}
                                  {next !=3 &&
                                    <div 
                                      className='w-full flex justify-end space-x-4 py-4'>    
                                      <button 
                                        className='text-sm font-semibold'
                                         onClick={()=>setNext(next-1)}
                                       >
                                        Cancel
                                      </button>
                                       <button 
                                         className='bg-orange-500 px-8 font-semibold text-lg py-3 text-xs rounded-sm'
                                         onClick={()=>setNext(next+1)}
                                        >
                                        Next
                                      </button>
                                      </div>

                                  }   
                             </div>

                       </div>
                      
               </div>             
          </div>
     </div>
  )
}
