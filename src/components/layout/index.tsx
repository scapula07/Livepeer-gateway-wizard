import React, { ReactNode } from "react";
import Navbar from "../../components/navbar";
import Panel from "./panel";
import { ToastContainer, toast } from "react-toastify";
type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="h-full font-mono bg-[#f9f9f9]">
      <Navbar />
      <div className="w-full h-full flex justify-center py-5">
        <div className="md:w-[95%] w-full h-full flex md:space-x-10 md:px-0">
          <div className="md:w-1/4 w-fit h-screen">
            <Panel />
          </div>
          <div className="md:w-full w-[90%] oveflow-y-scroll h-full no-scrollbar bg-[#f9f9f9]">
            {children}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
