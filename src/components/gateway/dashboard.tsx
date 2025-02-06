import React,{useEffect,useState} from 'react'
import { gatewayStore,userStore } from '@/recoil'
import { useRecoilValue } from 'recoil'
import { BeatLoader, ClipLoader } from 'react-spinners'
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { LiaDownloadSolid } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,AreaChart, Area } from "recharts";



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

export default function Dashboard() {
     const gateway=useRecoilValue(gatewayStore) as GATEWAY
     const user=useRecoilValue(userStore) as {email:""}
     const [cpuData, setCpuData] = useState([]);
     const [memoryData, setMemoryData] = useState([]);
     const router = useRouter();

     useEffect(() => {
      fetchMetrics();
      const interval = setInterval(() => fetchMetrics(), 30000); // Refresh every 30s
      return () => clearInterval(interval);
  }, [gateway]);

     const fetchMetrics = async () => {
      try {
          const response = await fetch("http://localhost:3000/api/metrics", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json();
          console.log(data,"data")
  
          const panels = data.dashboard.panels;
          const cpuPanel = panels.find((panel:any) => panel.title === "CPU Usage");
          const memoryPanel = panels.find((panel:any) => panel.title === "Memory Usage");
  
          if (!cpuPanel || !memoryPanel) {
              console.error("CPU or Memory panel not found in response.");
              return;
          }
  
          console.log("CPU Panel Data:", cpuPanel);
          console.log("Memory Panel Data:", memoryPanel);
  
          // Generate mock time-series values based on the query expressions
          const currentTime = new Date().toLocaleTimeString(); // Use real timestamps if available
  
          const formattedCpuData = cpuPanel.targets?.map((target:any, index:any) => ({
              time: currentTime, // Placeholder timestamp
              value: parseFloat(target.expr) || 0, // Mock CPU value (replace with real metric values when available)
              query: target.expr, // Keep track of the query
              id: `cpu-${index}`,
          })) || [];
  
          const formattedMemoryData = memoryPanel.targets?.map((target:any, index:any) => ({
              time: currentTime,
              value: parseFloat(target.expr) || 0, // Mock Memory value
              query: target.expr,
              id: `memory-${index}`,
          })) || [];
  
          console.log("Formatted CPU Data:", formattedCpuData);
          console.log("Formatted Memory Data:", formattedMemoryData);
  
          setCpuData(formattedCpuData);
          setMemoryData(formattedMemoryData);
  
      } catch (error) {
          console.error("Error fetching metrics:", error);
      }
  };

  console.log(cpuData,memoryData)
  

   return (
    <div className='w-full h-full flex flex-col space-y-10'>
           <div className='flex w-full justify-between'>
               <h5 className='font-semibold text-xl'>Hello {user?.email}! 👋</h5>
               <div className='flex space-x-6'>
                      {gateway.status !='running'?
                              <div className='flex items-center space-x-1.5 bg-gray-200 py-2 px-4 rounded-full'>
                                  <ClipLoader
                                      color='gray'
                                      size={16}
                                      />
                                  <p className='text-xs'>Initializing</p>
                              </div>   
                                  :
                              <div className='flex items-center space-x-1.5 bg-orange-200 py-2 px-4 rounded-full'>
                                <GoDotFill className='text-orange-600 text-xl'/>
                                <p className='text-xs text-orange-700 font-semibold'>Running</p>
                              </div>   
                          }    
                        <button className='border border-gray-200  bg-[#58815794] py-3 px-8 font-semibold rounded-full space-x-3 w-[80%] text-xs flex items-center justify-center'
                          onClick={()=>router.push(`/cmd~?id=${gateway.id}&name=${gateway.title}&ip=${gateway.ip}&url=${gateway.rpcUrl}`) }
                          >
                              <span> Generate ETH Account</span>
                        </button>         
               </div>
           </div>
        
          <div className='w-full '>
               <div className='flex w-full'>
                    {[
                      {
                        label:"CPU Usage",
                        data:cpuData
                      },
                      {
                        label:"Memory Storage",
                        data:memoryData
                      }
                    ].map((i)=>{
                       return(
                         <div className='flex flex-col w-full'>
                                 <h5 className='text-xl'>{i.label}</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={i.data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="value" stroke="red" fill="rgba(255, 0, 0, 0.2)" />
                                </AreaChart>

                              </ResponsiveContainer>
                          </div>
              
                       )
                    })

                    }

               </div>
              <div className='w-[100%] py-6 '> 

                <div className=" w-[100%] flex flex-col space-y-6 overflow-x-scroll no-scrollbar">
                   
                       <table className="table-auto w-[180%] border-separate border-spacing-0.5">
                           <thead className='py-2 bg-[#58815794]' >
                                  <tr >
                                      {
                                          [ 
                                            "IP Address",              
                                            "Type",
                                            "Status",
                                            "Grafana Url",
                                            "ETH",
                                            "Created" 
                                            ].map((text)=>{
                                              return(
                                                  <th className='text-sm text-left text-gray-800 font-semibold px-3'>{text}</th>
                                              )
                                            })
                                          }
                                  </tr>
                            </thead>
                            <tbody className='bg-white w-full'>
                                 <tr className='py-2 text-sm font-light '>
                                      <td className='bg-white  px-4  font-semibold' >{gateway?.ip}</td>
                                      <td className='bg-white  px-4  font-semibold' >{gateway?.type}</td>
                                      <td className='bg-white  px-4 font-semibold' >{"Active"}</td>
                                      <td className='bg-white  px-4  font-semibold' >{gateway?.dashboardUrl}</td>
                                      <td className='bg-white  px-4  font-semibold' >{"0xz234566789...0088"}</td>
                                      <td className='bg-white  px-4  font-semibold' >{"20th Jan"}</td>
                                 </tr>
                   
                            </tbody>

                        </table>
                       
                </div>


              </div>
          </div>
    </div>
  )
}
