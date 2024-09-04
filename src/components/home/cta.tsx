import React from 'react'

export default function CTA() {
  return (
    <div className='w-full bg-gray-100  flex px-10 py-10 font-mono '>
           <div className='w-1/2 flex flex-col'>
                <div className='flex flex-col space-y-2'>
                    <h5 className='text-xl text-gray-700'>Why should you use this Wizard?</h5>
                    <h5 className='h-0.5 w-1/4 bg-green-400'></h5>
               </div>

               <div className='flex flex-col space-y-4 py-8'>
                  {[
                    {
                        label:'5-Minute Setup',
                        text:'The quickest way to launch a high-capacity Gateway on the Livepeer network, whether for video transcoding or AI inference.'
                    },
                    {
                        label:'Auto-Scaling Solution',
                        text:'The Gateway Wizard challenges the belief that scalable transcoding and AI inference solutions can’t be automated. Your Gateway, whether for video transcoding or AI inference, will be ready to handle tasks, automatically adjusting to fluctuating demands. Whether processing a few video streams or scaling up to thousands of AI inference requests, your Gateway will dynamically expand or contract to meet performance requirements. Discover the power of this setup, like when we seamlessly handled over 10,000 tasks during one of our latest demos.'
                    },
                    {
                        label:'Cost-Effective Solution',
                        text:"Only pay for the resources your Gateway uses, whether it's transcoding or AI inference.."
                     },
                     {
                        label:'Fully Customizable Solution',
                        text:'Every aspect of your Gateway is under your control. With this setup, you can modify, pause, restart, or even dismantle your Transcoding or AI Inference Gateway with just a single click.'
                     },
                     
                   ].map((item)=>{
                    return(
                        <div className='flex'>
                             <p className='text-sm'><span className='font-semibold text-lg'>{item?.label}</span> {item?.text}</p>
                          
                        </div>
                    )
                  }) 

                  }

               </div>


              

          </div>
          <div className='w-1/2'>

           </div>

    </div>
  )
}
