import React from 'react'



export default function MidSection() {
    return (
      <div className='w-full px-4 md:px-10 py-10 md:py-20'>
           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-16 md:gap-y-10'>
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
          <div className='flex flex-col bg-[#D9D9D94D] h-56 md:h-72 py-3 md:py-4 px-3 md:px-4 items-center justify-between'>
              <div className=''>
              </div>
              <h5 className='text-sm md:text-base'>{item?.label}</h5>
          </div>
       )
  }