import React, { useState } from "react";
import { withDraw } from "@/lib/tickercontract";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Withdraw({ setTrigger }: any) {
  const [loading, setLoading] = useState(false);

  const withdrawEth = async () => {
    setLoading(true);
    try {
      const response = await withDraw();
      setLoading(false);
      toast("Successful transaction");
    } catch (e: any) {
      console.log(e);
      setLoading(false);
      toast.error(e.message);
    }
  };
  return (
    <div className="md:w-[500px] w-[300px] bg-white py-10 px-4">
      <div className="flex flex-col w-full items-center space-y-2 ">
        <h5>Your are about to withdraw all ETH from Gateway</h5>
        <div className="flex justify-center w-full space-x-4">
          <button
            className="bg-[#58815794] py-1.5 px-6"
            onClick={() => withdrawEth()}
          >
            {loading ? <ClipLoader size={14} /> : "Confirm"}
          </button>
          <button
            className="border-[#58815794] border py-1.5 px-6"
            onClick={() => setTrigger(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
