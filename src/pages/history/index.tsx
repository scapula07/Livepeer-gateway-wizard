import React from "react";
import Layout from "@/components/layout";
import { MdDelete } from "react-icons/md";
export default function History() {
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <h5 className="font-semibold text-xl text-slate-900">History</h5>
        <div className="flex flex-col space-y-6 py-6">
          {[1, 2, 3].map((_, index) => {
            return (
              <div
                key={index}
                className="border-b py-4 px-6 flex items-center justify-between"
              >
                <div className="flex flex-col space-y-2">
                  <h5 className="text-xs">Jan 1,2025</h5>
                  <div className="flex items-center space-x-4">
                    <h5 className="text-sm">2:30pm WAT</h5>
                    <h5 className="font-semibold">Fund Gateway 1</h5>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <h5>0.01 ETH</h5>
                  <MdDelete className="text-xl text-red-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
