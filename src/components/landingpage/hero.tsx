"use client";

import React from "react";
import Header from "./header";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Hero() {
  const { user } = useUser();

  return (
    <div className="w-full bg-[#A3B18A] text-[#1E1E1E]">
      <div className="w-full py-10 lg:py-20">
        <div className="w-full flex flex-col-reverse lg:flex-row px-4 md:px-10 py-12 md:py-24">
          <div className="w-full lg:w-2/5 flex flex-col space-y-6 md:pt-10 text-center lg:text-left">
            <div className="w-full space-y-2 md:space-y-4 flex flex-col">
              <h5 className="text-4xl md:text-6xl font-semibold">Gateway to</h5>
              <h5 className="text-4xl md:text-6xl font-semibold">
                Livepeer Network
              </h5>
            </div>
            <Link href={user.email ? "/gateways" : "/auth/login"}>
              <button className="bg-[#344E41] text-white font-semibold py-4 md:py-7 w-full md:w-1/2 mx-auto md:mx-0">
                Launch Gateway
              </button>
            </Link>
          </div>
          <div className="w-full lg:w-3/5 mb-8 md:mb-0">
            <div className="w-full relative">
              <div className="w-full px-4 md:px-12">
                <img src={"/world.png"} alt="World map" className="w-full" />
              </div>
              <div className="absolute top-0 flex w-full justify-end">
                <img
                  src={"/bannervideo.png"}
                  alt="Banner video"
                  className="w-[250px] md:w-[450px] -mt-10 md:-mt-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
