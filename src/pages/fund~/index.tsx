import React, { useState } from "react";
import useWeb3Provider from "@/hooks/useWeb3";
import {
  fundDepositAndReserve,
  fundDepositAndReserveFor,
  getSenderInfo,
  withDraw,
} from "@/lib/tickercontract";
import { useEffect } from "react";
import { FundParams } from "@/lib/api/types";
import Header from "@/components/fund/header";
import Modal from "@/components/modal";
import Withdraw from "@/components/fund/withdraw";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegMinusSquare } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Error from "next/error";
import { FaCopy, FaEthereum, FaCoffee } from 'react-icons/fa'
import { IoMdCheckmark } from 'react-icons/io'


export default function Fund() {
  const { connectWallet, walletState } = useWeb3Provider();
  const [fund, setFund] = useState<FundParams>();
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    walletState?.address && fetchSenderInfo();
  }, [walletState?.address]);

  const fundGateway = async (
    total: string,
    deposit: string,
    reserve: string
  ) => {
    setLoading(true);
    try {
      const response = await fundDepositAndReserve(total, deposit, reserve);
      setLoading(false);
      toast("Successful transaction");
    } catch (e: any) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  const fundGatewayFor = async (
    total: string,
    deposit: string,
    reserve: string,
    address: string
  ) => {
    setLoading(true);

    try {
      const response = await fundDepositAndReserveFor(
        total,
        deposit,
        reserve,
        address
      );
      setLoading(false);
      toast("Successful transaction");
    } catch (e: any) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  const fetchSenderInfo = async () => {
    try {
      const response = await getSenderInfo(
        walletState.address ? walletState.address : ""
      );
      setFund(response);
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="w-full">
        <Header walletState={walletState} connectWallet={connectWallet} />
        <div className="flex space-x-8 justify-center py-28">
          <div className="flex flex-col border h-20 w-44 px-3 py-1 space-y-5 rounded-sm">
            <h5>Reserve</h5>
            <h5 className="text-center text-green-500 font-bold">
              {fund?.reserve} ETH
            </h5>
          </div>
          <div className="flex flex-col border h-20 w-44 px-3 py-1 space-y-5 rounded-sm">
            <h5>Deposit</h5>
            <h5 className="text-center text-green-500 font-bold ">
              {fund?.deposit} ETH
            </h5>
          </div>
        </div>
        <h5
          className="text-center hover:underline hover:text-green-600 text-xl font-light"
          onClick={() => setTrigger(true)}
        >
          Withdraw your ETH
        </h5>
        {[
          {
            label: "Fund Gateway",
            fund: fundGateway,
          },
          {
            label: "Fund Gateway For",
            fund: fundGatewayFor,
          },
        ].map((item, index) => {
          return <FundGateway key={index} item={item} loading={loading} />;
        })}

        <div className="py-10">
              < BuyMeCoffee />
        </div>

         
      </div>
      <Modal trigger={trigger} cname="">
        <Withdraw setTrigger={setTrigger} />
      </Modal>
    </>
  );
}

const FundGateway = ({ item, loading }: { item: any; loading: boolean }) => {
  const [open, setOpen] = useState(false);
  const [ethFund, setFund] = useState({ deposit: "", reserve: "", total: "" });
  const [gatewayAddress, setAddress] = useState("");
  return (
    <div className="flex flex-col w-full items-center pt-4">
      <div className="flex items-center space-x-4">
        <h5 className="text-xl font-light">{item.label}</h5>
        {open ? (
          <FaRegMinusSquare
            className="text-xl"
            onClick={() => setOpen(false)}
          />
        ) : (
          <FaRegSquarePlus className="text-xl" onClick={() => setOpen(true)} />
        )}
      </div>
      {open && (
        <div className="flex flex-col items-center space-y-4 py-6 w-full">
          <input
            placeholder="Deposit and Reserve amount(ETH)"
            className="w-1/3 border border-black py-2 px-4  outline-green-600"
            value={ethFund.total}
            onChange={(e) => setFund({ ...ethFund, total: e.target.value })}
          />
          <input
            placeholder="Deposit amount(ETH)"
            className="w-1/3 border border-black py-2 px-4  outline-green-600"
            value={ethFund.deposit}
            onChange={(e) => setFund({ ...ethFund, deposit: e.target.value })}
          />
          <input
            placeholder="Reserve amount(ETH)"
            className="w-1/3 border border-black py-2 px-4 outline-green-600"
            value={ethFund.reserve}
            onChange={(e) => setFund({ ...ethFund, reserve: e.target.value })}
          />
          {item.label === "Fund Gateway For" && (
            <input
              placeholder="Gateway Address"
              className="w-1/3 border border-black py-2 px-4  outline-green-600"
              value={gatewayAddress}
              onChange={(e) => setAddress(e.target.value)}
            />
          )}

          <button
            className="border-[#58815794] border text-green-800 py-2 px-4 font-bold w-60 "
            onClick={() =>
              item?.fund(
                ethFund?.total,
                ethFund?.deposit,
                ethFund.reserve,
                gatewayAddress
              )
            }
          >
            {loading ? <ClipLoader size={14} /> : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
};






 function BuyMeCoffee() {
    const [copied, setCopied] = useState(false)
    const ethAddress = '0x52C9cF3B6BA0fb918CccCEAB6a48D93436B13d6b' // Replace with your ETH address

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(ethAddress)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <div className='w-full flex flex-col items-center py-8 mt-auto'>
            <div className='flex flex-col items-center space-y-4'>
                {/* Title */}
                <div className='flex items-center space-x-2'>
                    <FaCoffee className='text-amber-700 text-xl' />
                    <h3 className='text-lg font-medium'>Buy Me a Coffee</h3>
                </div>

                {/* ETH Address Container */}
                <div className='flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg'>
                    <FaEthereum className='text-gray-600' />
                    <span className='text-sm font-mono text-gray-600 hidden sm:block'>
                        {ethAddress}
                    </span>
                    <span className='text-sm font-mono text-gray-600 sm:hidden'>
                        {`${ethAddress.slice(0, 6)}...${ethAddress.slice(-4)}`}
                    </span>
                    <button
                        onClick={copyToClipboard}
                        className='p-1.5 hover:bg-gray-200 rounded-full transition-colors'
                        title='Copy address'
                    >
                        {copied ? (
                            <IoMdCheckmark className='text-green-500 text-lg' />
                        ) : (
                            <FaCopy className='text-gray-500 text-sm' />
                        )}
                    </button>
                </div>

                {/* Message */}
                <p className='text-sm text-gray-500 text-center max-w-md'>
                    If you find this helpful, consider buying me a coffee! Your support helps keep the project going.
                </p>
            </div>
        </div>
    )
}