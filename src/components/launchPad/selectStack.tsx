import React, { useState } from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { DeploymentParams } from "@/lib/api/types";

export default function SelectStack({
  data,
  setData,
}: {
  data: DeploymentParams;
  setData: any;
}) {
  const [region, setRegion] = useState("");

  return (
    <div className="w-full h-full space-y-4">
      <h5 className="text-xl font-semibold">Select Livepeer Stack</h5>
      <div className="w-full min-h-[50px] bg-white shadow border  py-2">
        <div className="px-4 border-b py-2">
          <h5 className=" font-semibold font-mono text-[0.96rem]">
            {" "}
            Choose a type
          </h5>
          <h5 className="text-sm">
            {" "}
            Select the type of Livepeer gateway or service you want to deploy
            based on your streaming needs and requirements
          </h5>
        </div>
        <div className="w-full py-4 flex flex-col px-4 space-y-4">
          <div className="w-full flex space-x-4">
            {[
              {
                label: " Livepeer Transcoding Gateway",
                desc: "Launch a gateway for video transcoding on the Livepeer network.",
                type: "transcoding",
              },
              {
                label: " Livepeer AI Gateway",
                desc: "Deploy an AI-powered gateway to process media on Livepeer.",
                type: "ai",
              },
            ].map((tab, index) => {
              return (
                <div
                  className={`flex border px-4 py-6 space-x-2 cursor-pointer ${
                    tab.type === "ai" ? "opacity-40 pointer-events-none" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setData({ ...data, gateway_type: tab.type });
                  }}
                >
                  {data.gateway_type === tab?.type ? (
                    <MdRadioButtonChecked className="text-green-500 text-xl" />
                  ) : (
                    <MdRadioButtonUnchecked className="text-green-500 text-xl" />
                  )}

                  <div className="flex flex-col space-y-2">
                    <h5 className="text-sm font-semibold">{tab?.label}</h5>
                    <h5 className="text-[0.85rem] text-slate-600">
                      {tab?.desc}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full min-h-[50px] bg-white shadow border  py-2">
        <div className="px-4 border-b py-2">
          <h5 className=" font-semibold font-mono text-[0.96rem]">
            {" "}
            Select cloud provider
          </h5>
          <h5 className="text-sm">
            Select a cloud service provider where your Livepeer gateway will be
            hosted. This determines the infrastructure your gateway will run on.
          </h5>
        </div>
        <div className="w-full py-4 flex flex-col px-4 space-y-4">
          <div className="w-full flex space-x-4">
            {[
              {
                label: "AWS",
                desc: "Deploy your Livepeer gateway using Amazon Web Services",
                provider: "aws",
              },
              {
                label: "GCP",
                desc: " Set up a Livepeer Catalyst on Google Cloud Platform",
                provider: "gcp",
              },
              {
                label: "Your Dedicated cloud Account",
                desc: "Host a Livepeer Gateway on a dedicated cloud infrastructure",
                provider: "dedicated",
              },
            ].map((tab, index) => {
              return (
                <div
                  key={index}
                  className={`flex border px-4 py-6 space-x-2 cursor-pointer ${
                    tab.provider !== "aws"
                      ? "opacity-40 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => {
                    setData({ ...data, provider: tab?.provider });
                  }}
                >
                  {data.provider === tab?.provider ? (
                    <MdRadioButtonChecked className="text-green-500 text-xl" />
                  ) : (
                    <MdRadioButtonUnchecked className="text-green-500 text-xl" />
                  )}

                  <div className="flex flex-col">
                    <h5 className="text-sm font-semibold">{tab?.label}</h5>
                    <h5 className="text-[0.85rem] text-slate-600">
                      {tab?.desc}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full py-4 flex flex-col px-4 space-y-4">
          <div className="w-full">
            <h5 className=" font-semibold font-sans text-[0.96rem] text-black">
              {" "}
              Choose region
            </h5>
            <h5 className="text-xs">
              Pick the geographic region for your deployment to optimize
              streaming performance and comply with local regulations
            </h5>
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            {[
              {
                label: "Amsterdam",
                desc: "Low-latency ,88ms",
              },
              {
                label: "Germany",
                desc: "Low-latency ,88ms",
              },
              {
                label: "Franfurt",
                desc: "Low-latency ,88ms",
              },
            ].map((tab, index) => {
              return (
                <div
                  key={index}
                  className=" flex border px-4 py-6 space-x-2 cursor-pointer opacity-40 pointer-events-none"
                >
                  {region === tab?.label ? (
                    <MdRadioButtonChecked className="text-green-500" />
                  ) : (
                    <MdRadioButtonUnchecked className="text-green-500" />
                  )}

                  <div className="flex flex-col">
                    <h5 className="text-sm font-semibold">{tab?.label}</h5>
                    <h5 className="text-[0.85rem] text-slate-600">
                      {tab?.desc}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
