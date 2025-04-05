"use client";

import { useState } from "react";
import { IoBalloon } from "react-icons/io5";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Header() {
  const { user, removeUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    removeUser();
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full sticky top-0 px-6 md:px-10 py-4 z-20 bg-[#A3B18A] shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-[#58815794] w-14 h-14 flex items-center justify-center rounded-full">
            <h5 className="text-4xl font-semibold text-[#1E1E1E]">G</h5>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <h5 className="font-semibold cursor-pointer">Home</h5>
          </Link>
          <Link href="/fund~">
            <h5 className="font-light cursor-pointer">Fund A Gateway</h5>
          </Link>
          <Link href="/blog">
             <h5 className="font-light cursor-pointer">Blog</h5>
          </Link>
          {/* <h5 className="font-light cursor-pointer">Contact us</h5> */}
          {user?.email ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <h5 className="bg-[#58815794] rounded-full font-bold text-xl h-8 w-8 flex items-center justify-center">
                  {user?.email?.slice(0, 1)?.toUpperCase()}
                </h5>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <Link href="/gateways">
                      <h5
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Dashboard
                      </h5>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="border px-6 py-1.5 border-[#1E1E1E]">
                Sign in
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="absolute top-20 left-0 w-full bg-[#A3B18A] shadow-md md:hidden flex flex-col items-center space-y-4 py-4">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <h5 className="font-semibold cursor-pointer">Home</h5>
          </Link>
          <Link href="/fund~" onClick={() => setIsMenuOpen(false)}>
            <h5 className="font-light cursor-pointer">Fund A Gateway</h5>
          </Link>
          <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
           <h5 className="font-light cursor-pointer">Blog</h5>
          </Link>
          {/* <h5 className="font-light cursor-pointer">Contact us</h5> */}

          {user?.email ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <h5 className="bg-[#58815794] rounded-full font-bold text-xl h-8 w-8 flex items-center justify-center">
                  {user?.email?.slice(0, 1)?.toUpperCase()}
                </h5>
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-40 bg-white border shadow-lg rounded-lg">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <Link href="/gateways">
                      <h5
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Dashboard
                      </h5>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
              <button className="border px-6 py-1.5 border-[#1E1E1E]">
                Sign in
              </button>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
