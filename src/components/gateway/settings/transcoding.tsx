import React, { useState } from 'react'
import { FiEdit3 } from "react-icons/fi";
import { FaToggleOn ,FaToggleOff} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
export default function TranscodingProfile() {
  return (
    <div className='w-full flex flex-col space-y-5 '>
        <h5 className='font-bold text-lg'>Your Transcoding profiles</h5>
           <div className='flex items-center justify-end space-x-4 py-6'>
                <button className='bg-[#58815794] py-2 px-4 text-sm font-bold '>Save changes</button>
            </div>
        <h5 className='text-sm bg-gray-200 py-4 px-4 rounded-sm w-full'>Choose a transcoding profile that suits your content's needs. Adjust resolution, bitrate, and other settings for optimized video quality.</h5>
        
        <div className='flex flex-col py-8'>
            {
              [
                {
                  title:'480p (SD Quality)',
                  desc:'Suitable for slower connections and mobile devices',
                  template:{
                    "name": "480p0",
                    "fps": 0,
                    "bitrate": 1600000,
                    "width": 854,
                    "height": 480,
                    "profile": "h264constrainedhigh",
                    "gop": "1"
                  },

                 },
                 {
                  title:'720p (HD Quality)',
                  desc:'Ideal for high-quality streaming on most devices.',
                  template:{
                    "name": "720p0",
                    "fps": 0,
                    "bitrate": 3000000,
                    "width": 1280,
                    "height": 720,
                    "profile": "h264constrainedhigh",
                    "gop": "1"
                  },
                  

                 },
                 {
                  title:'1080p (Full HD)',
                  desc:'Best for high-resolution content on large screens.',
                  template:{
                    "name": "1080p0",
                    "fps": 0,
                    "bitrate": 6500000,
                    "width": 1920,
                    "height": 1080,
                    "profile": "h264constrainedhigh",
                    "gop": "1"
                  }

                 }

               ].map((item)=>{
                 return(
                    <Profile
                       item={item}
                     />   
                 )
              })
            }

            <div className='flex items-center justify-end space-x-4 py-6'>
                <button className='border-[#58815794] border text-[#58815794] py-2 px-4 text-sm font-bold '>Add new profile</button>
                <button className='bg-[#58815794] py-2 px-4 text-sm font-bold '>Import JSON</button>

            </div>

        </div>
    </div>
  )
}



const Profile=({item}:{item:any})=>{
     const [edit,setEdit]=useState(false)
  return(
    <div className='flex flex-col'>
        <div className='flex w-full border-b border-t justify-between px-4 py-4 items-center '>
            
            <div className='w-3/4'>
                <h5 className='font-bold'>{item?.title}</h5>
                <h5 className='text-sm'>{item?.desc}</h5>
            </div>
            <div className='flex items-center space-x-6'>
                {edit?
                  <IoMdClose  className='text-2xl hover:text-red-500' onClick={()=>setEdit(false)}/>
                    :
                  <FiEdit3 className='text-2xl hover:text-green-700' onClick={()=>setEdit(true)}/>
                }
   
                <FaToggleOff className='text-2xl' />
            </div>
        </div>

        {edit&&
           <Form template={item?.template}/>
           }
    </div>
   )
}


const Form=({template}:{template:any})=>{
   return(
    <div className='grid grid-cols-2 gap-6 w-full px-4 py-4' >
          <input
            placeholder='FPS'
            value={template?.fps}
            className="border text-black px-4 py-2 rounded-sm"
            type={'number'}
           />
          <input
            placeholder='Bitrate'
            value={template?.bitrate}
            className="border text-black px-4 py-2 rounded-sm"
            type={'number'}
           />
           <input
            placeholder='Width'
            value={template?.width}
            className="border text-black px-4 py-2 rounded-sm"
            type={'number'}
           />
           <input
            placeholder='height'
            value={template?.height}
            className="border text-black px-4 py-2 rounded-sm"
            type={'number'}
           />
          <input
            placeholder='Profile'
            value={template?.profile}
            className="border text-black px-4 py-2 rounded-sm"
            type={'text'}
           />
          <input
            placeholder='GOP'
            value={template?.gop}
            className="border text-black px-4 py-2 rounded-sm"
            type={'text'}
           />

    </div>
   )
}