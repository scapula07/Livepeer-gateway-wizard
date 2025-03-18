"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const { user } = useUser();

  useEffect(() => {
    if (!user.email) {
      window.location.href = "/auth/login";
    }
  }, []);

  return (
    <div className="w-full flex justify-between px-10 py-2.5 border-b border-slate-300 shadow font-mono">
      <div className="w-3/5 flex items-center space-x-4">
        <div className="bg-[#58815794] w-10 h-10 flex items-center justify-center rounded-full">
          <h5 className="text-2xl font-semibold text-[#1E1E1E]">G</h5>
        </div>
        <h5></h5>
        <Link href="/launch-pad">
          <button className="bg-[#58815794] text-xs font-semibold px-4 py-2 rounded-sm">
            Launch
          </button>
        </Link>
      </div>
      <div className="w-2/5 flex items-center justify-end space-x-4">
        {/* <MdOutlineNotificationsNone 
               className='text-2xl text-slate-700'
             />
             <AiOutlineQuestionCircle 
               className='text-2xl text-slate-700'
             /> */}
        <h5 className="bg-[#58815794] rounded-full font-bold text-xl h-8 w-8 flex items-center justify-center">
          {user?.email?.slice(0, 1)?.toUpperCase()}
        </h5>
      </div>
    </div>
  );
}
