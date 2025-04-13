import React, { useEffect, useState, useRef } from "react";
import { gatewayStore, userStore } from "@/recoil";
import { useRecoilValue } from "recoil";
import { ClipLoader } from "react-spinners";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Modal from "../modal";
import { FaEthereum } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  MdOutlineContentCopy,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";

type GATEWAY = {
  id: string;
  creator: string;
  createdAt: string;
  title: string;
  cover: string;
  rpcUrl: string;
  type: string;
  status: string;
  ip: string;
  dashboardUrl: string;
  ethAddress: string;
};

export default function Dashboard() {
  const gateway = useRecoilValue(gatewayStore) as GATEWAY;
  const user = useRecoilValue(userStore) as { email: "" };
  const [cpuData, setCpuData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (!gateway) return;

  //   fetchMetrics();
  //   const interval = setInterval(fetchMetrics, 30000);

  //   return () => clearInterval(interval);
  // }, [gateway]);

  const fetchMetrics = async () => {
    const match = gateway?.dashboardUrl?.match(/\/d\/([^/]+)/);
    const id = match ? match[1] : null;
    const url = `http://${gateway.ip}:3000/api/dashboards/uid/${id}`;

    try {
      const response = await fetch("http://localhost:3000/api/metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });
      const data = await response.json();

      const panels = data.dashboard.panels;
      const cpuPanel = panels.find((panel: any) => panel.title === "CPU Usage");
      const memoryPanel = panels.find(
        (panel: any) => panel.title === "Memory Usage"
      );

      if (!cpuPanel || !memoryPanel) {
        console.error("CPU or Memory panel not found in response.");
        return;
      }

      // Generate mock time-series values based on the query expressions
      const currentTime = new Date().toLocaleTimeString(); // Use real timestamps if available

      const formattedCpuData =
        cpuPanel.targets?.map((target: any, index: any) => ({
          time: currentTime, // Placeholder timestamp
          value: parseFloat(target.expr) || 0, // Mock CPU value (replace with real metric values when available)
          query: target.expr, // Keep track of the query
          id: `cpu-${index}`,
        })) || [];

      const formattedMemoryData =
        memoryPanel.targets?.map((target: any, index: any) => ({
          time: currentTime,
          value: parseFloat(target.expr) || 0, // Mock Memory value
          query: target.expr,
          id: `memory-${index}`,
        })) || [];

      setCpuData(formattedCpuData);
      setMemoryData(formattedMemoryData);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    if (!gateway) return;

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);

    return () => clearInterval(interval);
  }, [gateway]);

  return (
    <>
      <div className="w-full px-4 max-w-full h-full flex flex-col space-y-10">
        <div className="flex flex-col space-y-7 w-full items-center justify-center">
          <h5 className="font-semibold md:text-xl text-base">
            Hello {user?.email}! 👋
          </h5>
          <div className="flex space-x-3 md:space-x-6">
            {gateway.status != "running" ? (
              <div className="flex w-fit items-center space-x-1.5 bg-gray-200 py-2 px-4 rounded-full">
                <ClipLoader color="gray" size={16} />
                <p className="text-xs">Initializing</p>
              </div>
            ) : (
              <div className="flex w-fit items-center space-x-1.5 bg-orange-200 py-2 px-4 rounded-full">
                <GoDotFill className="text-orange-600 text-xl" />
                <p className="text-xs text-orange-700 font-semibold">Running</p>
              </div>
            )}
            <button
              className="border border-gray-200  bg-[#58815794] py-3 px-8 font-semibold rounded-full space-x-3 md:w-[80%] w-fit text-xs flex items-center justify-center"
              onClick={() => setTrigger(true)}
            >
              {gateway.ethAddress?.length > 0 ? (
                <span>
                  {gateway.ethAddress.slice(0, 10) +
                    "..." +
                    gateway.ethAddress.slice(-4)}
                </span>
              ) : (
                <span>Account</span>
              )}

              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>

        <div className="w-full">
          {/* <div className="flex flex-col md:flex-row w-full gap-6">
            {[
              { label: "CPU Usage", data: cpuData },
              { label: "Memory Storage", data: memoryData },
            ].map((i, index) => (
              <div key={index} className="w-full min-w-0">
                <h5 className="text-base md:text-lg lg:text-xl mb-2">
                  {i.label}
                </h5>
                <div className="w-full max-w-full overflow-hidden">
                  <ResponsiveContainer
                    width="100%"
                    height={window.innerWidth < 768 ? 180 : 300}
                  >
                    <AreaChart data={i.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="red"
                        fill="rgba(255, 0, 0, 0.2)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div> */}

          <div className="w-[100%] py-6 space-y-4">
            <div
              className=" w-[100%] flex flex-col space-y-6 overflow-x-scroll shadow no-scrollbar"
              ref={dropdownRef}
            >
              <table className="table-auto md:w-[180%] w-full border-separate border-spacing-0.5">
                <thead className="py-2 bg-[#58815794]">
                  <tr>
                    {[
                      "IP Address",
                      "Type",
                      "Grafana Url",
                      "ETH Address",
                      "Created At",
                    ].map((text, index) => {
                      return (
                        <th
                          key={index}
                          className="text-sm text-left text-gray-800 font-semibold px-3 whitespace-nowrap"
                        >
                          {text}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white w-full">
                  <tr className="py-2 text-sm font-light ">
                    <td className="bg-white  px-4  font-semibold">
                      {gateway?.ip}
                    </td>
                    <td className="bg-white  px-4  font-semibold">
                      {gateway?.type}
                    </td>
                    {/* <td className='bg-white  px-4 font-semibold' >{"Active"}</td> */}
                    <td className="bg-white  px-4  font-semibold flex items-center">
                      <a
                        href={gateway.dashboardUrl}
                        className="hover:underline space-x-5"
                      >
                        {gateway?.dashboardUrl}
                      </a>
                      <MdKeyboardArrowDown
                        className="text-3xl"
                        onClick={() => setIsOpen(!isOpen)}
                      />
                      {isOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4">
                          <p className="text-gray-700 text-sm">
                            <strong>Username:</strong> admin
                          </p>
                          <p className="text-gray-700 text-sm mt-2">
                            <strong>Password:</strong> admin
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="bg-white  px-4  font-semibold">
                      {gateway.ethAddress?.slice(0, 10) +
                        ".." +
                        gateway.ethAddress?.slice(-2)}
                    </td>
                    <td className="bg-white px-4 whitespace-nowrap font-semibold">
                      {gateway?.createdAt}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full ">
              <h5>
                
              </h5>
                [⬇️ Download Key File]
            </div>
          </div>
        </div>

      </div>
      <Modal trigger={trigger} cname="w-full justify-center flex items-center">
        <GatewayAccount gateway={gateway} setTrigger={setTrigger} />
      </Modal>
    </>
  );
}

const GatewayAccount = ({
  gateway,
  setTrigger,
}: {
  gateway: GATEWAY;
  setTrigger: any;
}) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(gateway.ethAddress)
      .then(() => alert("Ethereum address to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err));
  };
  const router = useRouter();

  return (
    <div className="bg-white md:w-1/3 w-full mx-2 py-4 rounded-lg flex flex-col items-center justify-center">
      <div className="w-full flex justify-end px-4">
        <IoMdClose className="text-3xl" onClick={() => setTrigger(false)} />
      </div>
      <img src={"/img.png"} className="w-44 h-44" />
      <div className="flex flex-col items-center space-y-6 w-full">
        <div className="flex items-center justify-center space-x-4">
          <FaEthereum className="text-xl" />
          <h5 className="w-full flex items-center space-x-5">
            <span>
              {gateway.ethAddress?.slice(0, 10) +
                ".." +
                gateway.ethAddress?.slice(-2)}
            </span>
            <MdOutlineContentCopy onClick={copyToClipboard} />
          </h5>
        </div>
        <div className="flex flex-col space-y-3 items-center">
          <h5
            className="text-sm hover:underline font-mono"
            onClick={() =>
              router.push(
                `/cmd~?id=${gateway.id}&name=${gateway.title}&ip=${
                  gateway.ip
                }&url=${gateway.rpcUrl}&cli=${false}`
              )
            }
          >
            Generate ETH Account
          </h5>
          <h5
            className="text-sm hover:underline font-mono"
            onClick={() =>
              router.push(
                `/cmd~?id=${gateway.id}&name=${gateway.title}&ip=${
                  gateway.ip
                }&url=${gateway.rpcUrl}&cli=${true}`
              )
            }
          >
            Livepeer CLI
          </h5>
        </div>
      </div>
    </div>
  );
};
