import React, { useState, useEffect } from "react";
import { AiOutlineGateway } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { TbWaveSawTool } from "react-icons/tb";
import { MdHistory, MdDashboardCustomize } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { gatewayStore } from "../../recoil";
import { useRecoilState } from "recoil";
import { truncateWithEllipses } from "@/lib/utils";
import { IoIosApps } from "react-icons/io";
import { AiFillApi } from "react-icons/ai";
import Endpoint from "../gateway/endpoint";
import Apps from "../gateway/apps";

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

export default function Panel() {
  const router = useRouter();
  const pathname = router.pathname;
  const { gateway_id } = router.query;
  const gatewayId = gateway_id as string;
  const [active, setActive] = useState(`/gateways/${gateway_id}/dashboard`);
  const [globalGateway, setGlobalGateway] = useRecoilState(gatewayStore);
  const [gateway, setGateway] = useState<GATEWAY>();
  useEffect(() => {
    if (gatewayId?.length > 0) {
      const unsub = onSnapshot(doc(db, "gateways", gatewayId), (doc) => {
        const date = new Date(doc?.data()?.createdAt?.seconds * 1000);

        // Format as a readable string
        const formattedDate = date.toLocaleString();
        setGateway({
          id: doc?.id,
          creator: doc.data()?.creator,
          createdAt: formattedDate,
          title: doc?.data()?.title,
          cover: doc?.data()?.cover,
          rpcUrl: doc?.data()?.rpcUrl,
          type: doc?.data()?.type,
          status: doc?.data()?.status,
          ip: doc?.data()?.ip,
          dashboardUrl: doc?.data()?.dashboardUrl,
          ethAddress: doc?.data()?.ethAddress,
        });

        setGlobalGateway({
          id: doc?.id,
          creator: doc.data()?.creator,
          createdAt: formattedDate,
          title: doc?.data()?.title,
          cover: doc?.data()?.cover,
          rpcUrl: doc?.data()?.rpcUrl,
          type: doc?.data()?.type,
          status: doc?.data()?.status,
          ip: doc?.data()?.ip,
          dashboardUrl: doc?.data()?.dashboardUrl,
          ethAddress: doc?.data()?.ethAddress,
        });
      });
    }
  }, [gateway_id]);

  return (
    <div className="w-full h-full flex flex-col font-mono bg-white shadow">
      <div className="flex flex-col md:space-y-2 space-y-5 border-b py-2">
        {[
          {
            icon: <AiOutlineGateway />,
            label: "Gateways",
            link: "/gateways",
          },
        ].map((tab, i) => {
          return (
            <Link href={tab?.link} key={i}>
              <div
                className={`w-full items-center space-x-4 ${
                  tab?.link === pathname ? "bg-[#58815794] " : "bg-white"
                } px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-black md:flex hidden`}
                key={i}
              >
                <h5 className="font-bold">{tab?.icon}</h5>
                <h5 className="font-bold text-[0.88rem] font-mono">
                  {tab?.label}
                </h5>
              </div>
              <h5 className="font-bold md:hidden block px-4">{tab?.icon}</h5>
            </Link>
          );
        })}
      </div>
      {gateway_id && gateway && (
        <div className="flex flex-col md:gap-y-2 gap-y-5 py-3">
          <h5 className="text-lg font-semibold px-4 hidden md:block">
            {truncateWithEllipses(gateway.title, 15)} Gateway
          </h5>
          <h5 className="text-lg font-semibold px-4 md:hidden block text-center">
            {gateway.title.charAt(0).toUpperCase()}
          </h5>
          {[
            {
              icon: <MdDashboardCustomize />,
              label: "Dashboard",
              link: `/gateways/${gateway_id}/dashboard`,
            },
            {
              icon: <FaEthereum />,
              label: "Fund Gateway",
              link: `/gateways/${gateway_id}/fund`,
            },
            {
              icon: <AiFillApi />,
              label: "Endpoints",
              link: `/gateways/${gateway_id}/endpoints`,
            },
            {
              icon: <IoIosApps />,
              label: "Apps",
              link: `/gateways/${gateway_id}/apps`,
            },
            {
              icon: <FaDeleteLeft style={{ color: "red" }} />,
              label: "Terminate",
              link: `/gateways/${gateway_id}/terminate`,
            },
          ].map((tab, i) => {
            return (
              <Link href={tab?.link} key={i}>
                <div
                  className={`  flex w-full items-center space-x-4 ${
                    tab?.link === active ? "bg-[#58815794] " : "bg-white"
                  } px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-black md:flex hidden
                                     `}
                  key={i}
                  onClick={() => setActive(tab?.link)}
                >
                  <h5 className="font-bold">{tab?.icon}</h5>
                  <h5 className="font-bold text-[0.88rem] font-mono">
                    {tab?.label}
                  </h5>
                </div>
                <h5 className="font-bold md:hidden block px-4">{tab?.icon}</h5>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
