import React, { useState } from "react";
import { DeploymentParams } from "@/lib/api/types";
import Confetti from "react-confetti";
import Link from "next/link";

export default function Loader({
  data,
  isLoading,
  id,
  progress,
  showProgress,
}: {
  data: DeploymentParams;
  isLoading: boolean;
  id: string;
  progress: number;
  showProgress: boolean;
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
        <Deployed id={id} />
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
