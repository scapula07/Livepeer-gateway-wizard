import React, { useState } from "react";
import { DeploymentParams } from "@/lib/api/types";
import Confetti from "react-confetti";
import Link from "next/link";
import { useRouter } from "next/router";
import { gatewayApi } from "@/firebase/gateway";
import { BeatLoader, ClipLoader } from "react-spinners";
export default function Loader({
  data,
  isLoading,
  id,
  progress,
  showProgress,
  deploymentFailed
}: {
  data: DeploymentParams;
  isLoading: boolean;
  id: string;
  progress: number;
  showProgress: boolean;
  deploymentFailed:boolean
}) {
  return (
    <div className="w-full h-[50vh] md:py-20 py-5">
      {showProgress ? (
        <div className="w-2/3 mx-auto px-5 pt-6 pb-10 shadow rounded flex flex-col space-y-5">
          <h2 className="text-center font-bold text-2xl">
            Preparing your dashboard... {progress}%
          </h2>
          <div className="w-full max-w-xl mx-auto bg-gray-200 rounded-lg h-2 overflow-hidden">
            <div
              className="bg-[#58815794] h-full transition-all duration-1000 ease-linear rounded-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
        {deploymentFailed?
              <Retry id={id}/>
              :
              <Deployed id={id} />
           }             
        </>
      )}
    </div>
  );
}

const Deployed = ({ id }: { id: string }) => {
  return (
    <div className=" ">
      <Confetti />
      <div className="flex flex-col items-center space-y-10">
        <h5 className="font-semibold text-center md:text-left text-4xl text-slate-700">
          Your Gateway is Live
          <span role="img" aria-label="party-popper">
            🎉
          </span>
        </h5>

        <div className="w-full flex justify-center">
          <Link href={`/gateways/${id}/dashboard`} className="md:w-1/3 w-full">
            <button className="bg-[#A3B18A] w-full py-3 rounded-full font-semibold text-lg">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Retry=({ id }: { id: string })=>{
  const { replace } = useRouter();
  const [isLoading,setLoading]=useState(false)
  const retry= async() => {
    setLoading(true)
    try{
      const res=await gatewayApi.deleteInstance(id)
      res&&replace("/launch-pad/");
      setLoading(false)
    }catch(e){
      console.log(e)
      setLoading(false)
    }
  };
   return(
    <div className="w-full h-[50vh] md:py-20 py-5">
        <div className="w-2/3 mx-auto px-5 pt-6 pb-10 shadow rounded flex flex-col items-center space-y-5">
            <h2 className="text-center font-bold text-2xl text-red-600">
                Deployment Failed  😞
            </h2>
           
                <button className="bg-[#58815794] px-8 py-2 rounded-xl text-sm hover:bg-black hover:text-white " 
                  onClick={retry}
                 >
                  Retry {isLoading&&<BeatLoader size={6}/>}
                </button>
          </div>
      </div>
    )
}
