import React,{useState,useEffect} from 'react'
import { AiOutlineGateway } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { TbWaveSawTool } from "react-icons/tb";
import { MdHistory ,MdDashboardCustomize} from "react-icons/md";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaEthereum } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import {doc,onSnapshot} from "firebase/firestore"
import { db } from '@/firebase/config';
import {gatewayStore} from "../../recoil"
import {useRecoilState} from 'recoil'

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

export default function Panel() {
    const router = useRouter();
    const pathname = router.pathname;
    const { gateway_id } = router.query ;
    const gatewayId=gateway_id as string
    const [active,setActive]=useState(`/gateways/${gateway_id}/dashboard`)
    const [globalGateway,setGlobalGateway]=useRecoilState(gatewayStore) 
    const [gateway,setGateway]=useState<GATEWAY>()
    useEffect(()=>{
        
      if(gatewayId?.length >0){
          const unsub = onSnapshot(doc(db,"gateways",gatewayId), (doc) => {   
              setGateway({
                id:doc?.id,
                creator:doc.data()?.creator,
                createdAt:doc?.data()?.createdAt,
                title:doc?.data()?.title,
                cover:doc?.data()?.cover,
                rpcUrl:doc?.data()?.rpcUrl,
                type:doc?.data()?.type,
                status:doc?.data()?.status,
                ip:doc?.data()?.ip,
              })

              setGlobalGateway({
                id:doc?.id,
                creator:doc.data()?.creator,
                createdAt:doc?.data()?.createdAt,
                title:doc?.data()?.title,
                cover:doc?.data()?.cover,
                rpcUrl:doc?.data()?.rpcUrl,
                type:doc?.data()?.type,
                status:doc?.data()?.status,
                ip:doc?.data()?.ip,
              })
          });
      }
  },[])
  
  return (
    <div className='w-full h-full flex flex-col font-mono bg-white'>
          <div className='flex flex-col space-y-2 border-b py-2'>
              {[  {
                    icon:<AiOutlineGateway />,
                    label:"Gateways",
                    link:"/gateways"
                  },
                  {
                    icon:< MdHistory />,
                    label:"History",
                    link:"/history"
                  },
                  {
                    icon:< TbWaveSawTool/>,
                    label:"Home",
                    link:"/home"
                  },
               
                ].map((tab,i)=>{
                return(
                    <Link href={tab?.link}>
                          <div 
                            className={
                              `  flex w-full items-center space-x-4 ${tab?.link===pathname?'bg-[#58815794] ':'bg-white'} 
                                 px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-black
                              `}
                            key={i} > 
                              <h5 className='font-bold'>{tab?.icon}</h5> 
                                <h5 className='font-bold text-[0.88rem] font-mono'>{tab?.label}</h5>
                         </div>
                    </Link>
                     ) })
                     }

              </div>
              {gateway_id?.length !=undefined&&
                  <div className='flex flex-col space-y-2 py-2'>
                      <h5 className='text-lg font-semibold px-4'>{gateway?.title} Gateway</h5>
                       {[  {
                           icon:<MdDashboardCustomize />,
                           label:"Dashboard",
                           link:`/gateways/${gateway_id}/dashboard`
                         },
                         {
                           icon:< FaEthereum/>,
                           label:"Fund Gateway",
                           link:`/gateways/${gateway_id}/fund`
                         },
                         {
                           icon:< CiSettings/>,
                           label:"Settings & Configuration",
                           link:`/gateways/${gateway_id}/settings`
                         },
                         {
                          icon:< FaDeleteLeft style={{color:"red"}}/>,
                          label:"Terminate",
                          link:`/gateways/${gateway_id}/terminate`
                        },
                      
                       ].map((tab,i)=>{
                       return(
                           <Link href={tab?.link}>
                                 <div 
                                   className={
                                     `  flex w-full items-center space-x-4 ${tab?.link===active?'bg-[#58815794] ':'bg-white'} 
                                        px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-black
                                     `}
                                   key={i} 
                                   onClick={()=>setActive(tab?.link)}
                                   > 
                                     <h5 className='font-bold'>{tab?.icon}</h5> 
                                       <h5 className='font-bold text-[0.88rem] font-mono'>{tab?.label}</h5>
                                </div>
                           </Link>
                            ) })
                            }
       
                </div>
             }
       
    </div>
  )
}
