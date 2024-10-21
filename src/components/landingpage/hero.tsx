import React from 'react'
import Header from './header'
import Link from 'next/link'


export default function Hero() {
  return (
    <div className='w-full bg-[#A3B18A] text-[#1E1E1E]'>
        <Header />
        <div className='w-full py-20'>
                <div className='w-full flex px-10 py-36 items-center'>
                    <div className='w-2/5 flex flex-col space-y-6 pt-10'>
                        <div  className='w-full space-y-4 flex flex-col '>
                            <h5 className='text-6xl font-semibold '>Gateway to  your </h5>
                            <h5 className='text-6xl font-semibold '> Livepeer Media</h5>
                            <h5 className='text-6xl font-semibold '>Server</h5>
                      </div>
                      <Link href={'/auth/signup'}>
                          <button className='bg-[#344E41] text-white font-semibold py-7 w-1/2'>Launch Gateway</button>   
                      </Link>          
                   </div>
                    <div className='w-3/5'>
                        <div className='w-full relative'>
                              <div className='w-full px-12 '>
                                    <img 
                                        src={"/world.png"}
                                    />
                              </div>
                           
                              <div  className='absolute top-0  flex w-full justify-end'>
                                   <img 
                                       src={"/bannervideo.png"}
                                       className="w-[450px] -mt-20"
                                    />
                             </div>

                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}


