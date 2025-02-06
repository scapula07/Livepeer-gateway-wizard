import React from 'react'
import { useRouter } from 'next/router';
import Dashboard from './dashboard';
import Funding from './funding';
import Terminate from './terminate';
import Settings from './settings';

export default function GatewayPage() {
    const router = useRouter();
    const {slug} = router.query ;
    if(slug==="dashboard"){
        return <Dashboard />
     }
    // if(slug==="settings"){
    //   return <Settings/>
    // }
    if(slug==="fund"){
       return <Funding/>
    }
    if(slug==="terminate"){
      return <Terminate/>
   }
   return (
     <div className='w-full h-full px-2' >
         <h5 className='text-lg font-semibold'>Coming Soon!!</h5>
     </div>
  )
}
