import React,{useState} from 'react'
import Header from '@/components/landingpage/header'
import { authApi } from '@/firebase/auth'
import { useRouter } from "next/router";

export default function Signup() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [cred,setCred]=useState({email:'',password:''})

    const { replace } = useRouter()

    const submit=async()=>{
         setLoading(true)
      try{
          const response =await authApi.register(cred?.email,cred?.password)
          localStorage.clear();
          localStorage.setItem('user',JSON.stringify(response));
          response&&setLoading(false)
          replace('/gateways')
        }catch(e){
          setLoading(false)
       }
    }

  return (
    <div className='w-full h-full font-mono  bg-[#A3B18A]'>
      <Header />
      <div className='w-full flex h-screen justify-center py-20 items-center'>
        <div className='flex flex-col items-center w-full space-y-5'>
           <h5 className='text-3xl font-semibold'>Register</h5>

           <div className='w-1/2 shadow-lg py-10 px-8 space-y-8 bg-white'>
                {[
                  {
                    label:"Email address",
                    text:'',
                    val:cred?.email,
                    placeholder:"...@gmail.com",
                    addCred:(input:string)=>setCred({...cred,email:input})
                  },
                  {
                    label:"Password",
                    text:'',
                    val:cred?.password,
                    placeholder:'',
                    addCred:(input:string)=>setCred({...cred,password:input})
                  },


                  ].map((item)=>{
                   return(
                    <div className='flex flex-col space-y-3'>
                         <label>{item?.label}  <span className='text-red-500'>*</span>
                        </label>
                        <input 
                          className='border-b w-full outline-green-300 py-3 px-3'
                          type={item?.label==="Password"?'password':'text'}
                          value={item?.val}
                          placeholder={item?.placeholder}
                          onChange={(e)=>item?.addCred(e.target.value)}
                        />
                    </div>
                   )
                })

                }
                
                <div className='w-full flex items-center space-x-2'>
                    <input 
                    className='outline-green-400 '
                    type={"checkbox"}
                    />
                    <h5 className='font-semibold text-gray-600'>I want to receive updates about products and promotions.</h5>

                </div>

                <div className=''>
                <button
                    className={`bg-green-500 px-4 text-sm rounded-sm font-semibold py-2 transition duration-300 ease-in-out ${
                      isLoading ? 'animate-pulse opacity-75 cursor-not-allowed' : ''
                    }`}
                    onClick={submit}
                    disabled={isLoading}
                  >
                    Register
                </button>
                </div>

                <h5 className='font-semibold text-sm  text-blue-500'>
                     Already have an account?  <span className='text-green-600 cursor hover:text-black' onClick={()=>replace('/auth/login')}>Login</span>
                </h5>
           </div>

         

        </div>
           

      </div>

    </div>
  )
}
