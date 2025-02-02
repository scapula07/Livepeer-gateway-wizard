import React,{useState} from 'react'
import Navigator from '@/components/launchPad/nav'
import Navbar from '@/components/navbar'
import Panel from "../../components/launchPad/panel"
import SelectStack from '@/components/launchPad/selectStack'
import Configuration from '@/components/launchPad/configuration'
import Loader from '@/components/launchPad/loader'
import { _deploy } from '@/lib/api/gateway.api'
import { DeploymentParams } from '@/lib/api/types'
import { useRouter } from 'next/router';

export default function LaunchPad() {
     const [next,setNext]=useState(1)
     const [isLoading,setLoading]=useState<boolean>(false)

     const router = useRouter();
     const { id  } = router.query 
     const gateway_id=id as string

     function sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

     const [data,setData]=useState<DeploymentParams>({
                                    id:gateway_id,
                                    gateway_type:"",
                                    provider:"",
                                    region:"",
                                    gatewayName:"",
                                    rpcUrl:"",
                                    password:"",
                                    transcoding_profile:""
                                 })

     const launch=async()=>{
            setLoading(true)
            await sleep(2000);
            setNext(3)
         try{
             const response= await _deploy(data)
             console.log(response.data,"redis")
             response?.data&&setLoading(false)
         }catch(e){
             console.log(e)
             setLoading(false)
             setNext(2)

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
                                 {next===1&&  
                                  <SelectStack 
                                    data={data} 
                                    setData={setData}/>}
                                 {next===2&& 
                                  <Configuration 
                                      data={data} 
                                      setData={setData}
                                      />}
                                 {next===3&&  
                                   <Loader 
                                      data={data} 
                                      isLoading={isLoading} 
                                      id={gateway_id}
                                      />}
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
                                            className={`bg-orange-500 px-6 font-semibold text-xl py-3 text-xs rounded-sm  transition duration-300 ease-in-out ${
                                              isLoading && 'animate-pulse opacity-75 cursor-not-allowed'}`}
                                              onClick={next==2?()=>launch():()=>setNext(next+1)}
                                          >
                                          {next==2?'Launch':'Next'}
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
