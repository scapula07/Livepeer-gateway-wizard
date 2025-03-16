"use client";

import React from "react";
import { IoBalloon } from "react-icons/io5";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Header() {
  const { user, removeUser } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    removeUser();
    setIsOpen(false);
  };

  return (
    <div className="w-full fixed px-10 py-4 z-20">
      <div className="flex items-center w-full">
        <div className="w-1/2">
          <div className="bg-[#58815794] w-20 h-20 flex items-center justify-center rounded-full">
            <h5 className="text-6xl font-semibold text-[#1E1E1E]">G</h5>
          </div>
        </div>

        <div className="w-1/2 flex items-center space-x-6 justify-end">
          <h5 className="font-semibold ">Home</h5>
          <Link href="/fund~">
            <h5 className="font-light ">Fund A Gateway</h5>
          </Link>
          <h5 className="font-light ">Blog</h5>
          <h5 className="font-light ">Contact us</h5>
          {user?.email ? (
            <div className="relative">
              <button onClick={() => setIsOpen(!isOpen)}>
                <h5 className="bg-[#58815794] rounded-full font-bold text-xl h-8 w-8 flex items-center justify-center">
                  {user?.email?.slice(0, 1)?.toUpperCase()}
                </h5>
                {isOpen && (
                  <div className="absolute -right-4 mt-2 w-fit bg-white border shadow-lg rounded-lg">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </button>
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="border bg-[] px-6 py-1.5 border-[#1E1E1E]">
                Sign in
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
