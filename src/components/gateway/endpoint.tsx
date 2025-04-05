import React from 'react'
import { IoCopyOutline } from "react-icons/io5";
import { gatewayStore } from '@/recoil';
import { useRecoilValue } from 'recoil';

export default function Endpoint() {
     const gateway=useRecoilValue(gatewayStore) as {ip:""}
     const copyToClipboard = () => {
        navigator.clipboard
          .writeText(`rtmp://${gateway?.ip}:1935/abcd`)
          .then(() => alert("Rtmp url copied to clipboard!"))
          .catch((err) => console.error("Failed to copy:", err));
      };
  return (
    <div className='w-full space-y-2'>
         <h5 className='font-semibold '>Streaming software setup</h5>
         <p className='text-sm'>Copy and paste the stream key into your streaming software. Use the RTMP ingest. The RTMP ingest is more common with OBS users.</p>
        
        <div className='flex flex-col py-5 space-y-2'>
             <h5 className='font-semibold'>RTMP ingest</h5>
             <div className='flex items-center space-x-4 '>
                <h5>rtmp://{gateway?.ip}:1935/abcd</h5>
                <IoCopyOutline onClick={copyToClipboard}/>
             </div>

        </div>
    </div>
  )
}
