import React from 'react'

export default function MidSection() {
  return (
    <div className='w-full px-10 py-20'>
         <div className='grid grid-cols-4 gap-x-16 gap-y-10'>
            {[
                {
                    label:"Single Click Launch"
                },
                {
                    label:"Launch Multiple Gateway"
                },
                {
                    label:"Single Click Launch"
                },
                {
                    label:"Single Click Launch"
                },
                {
                    label:"Single Click Launch" 
                },
                {
                    label:"Launch Multiple Gateway"
                },
                {
                    label:"Single Click Launch" 
                },
                {
                    label:"Single Click Launch" 
                }

            ]?.map((item)=>{
                return(
                   <Card
                     item={item}
                    />
                )
            })
            }

         </div>

    </div>
  )
}


const Card=({item}:{item:any})=>{
     return(
        <div className='flex flex-col bg-[#D9D9D94D] h-72 py-4 px-4 items-center justify-between '>
            <div className=''>

            </div>
            <h5>{item?.label}</h5>

        </div>
     )
}