import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";

export default function Navigator() {
  return (
    <div className="w-full flex md:px-10 px-5 py-5 items-center space-x-2">
      <Link href={"/gateways"}>
        <h5 className="text-sm font-semibold underline text-green-800 cursor hover:text-green-600">
          Gateways
        </h5>
      </Link>
      <SlArrowRight size={10} className="text-sm font-bold text-slate-600" />
      <h5 className="text-sm font-semibold text-slate-800">Launch </h5>
    </div>
  );
}
