import React from "react";
import Link from "next/link";
import { gatewayStore } from "@/recoil";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import TranscodingProfile from "./transcoding";

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
};

export default function Settings() {
  const gateway = useRecoilValue(gatewayStore) as GATEWAY;

  const { gateway_id } = useRouter().query;
  console.log(gateway_id, "path");
  return (
    <div className="w-full h-full flex space-x-5 ">
      <div className="w-1/4">
        <h5 className="font-bold text-lg">Settings</h5>
        <div className="w-full flex flex-col py-4 space-y-2 px-4">
          {[
            {
              text: "Transcoding profiles",
              link: "transcoding-profiles",
            },
            {
              text: "Change Gateway details",
              link: "details",
            },
          ]?.map((item, index) => {
            return (
              <h5
                key={index}
                className="text-sm font-semibold hover:bg-orange-100 py-2 px-2"
              >
                {item.text}
              </h5>
            );
          })}
        </div>
      </div>

      <div className="w-3/4 py-6 ">
        <TranscodingProfile />
      </div>
    </div>
  );
}
