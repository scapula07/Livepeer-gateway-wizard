import React,{ReactNode} from 'react'

export default function Modal({
                           children,
                           cname,
                           trigger}:
                           {
                            children:ReactNode,
                            cname:string,
                            trigger:boolean
                        }) {
   return (
    <div>
          { trigger&&
            <div className="overlay-style">
                <div className={`modal-upload ${cname}`}>
                   {children}
                </div> 
                
            </div>    
            }

    </div>
  )
}