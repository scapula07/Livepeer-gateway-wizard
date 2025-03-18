import React, { useState } from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { DeploymentParams } from "@/lib/api/types";

type Props = {
  data: DeploymentParams;
  setData: any;
  confirmPassword: string;
  setConfirmPassword: (x: string) => void;
};

export default function Configuration({
  data,
  setData,
  confirmPassword,
  setConfirmPassword,
}: Props) {
  const [profile, setProfile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (data.password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  return (
    <div className="w-full h-full space-y-4">
      <h5 className="text-xl font-semibold">Specify Details</h5>
      <div className="w-full min-h-[50px] bg-white shadow border  py-2">
        <div className="px-4 border-b py-2">
          <h5 className=" font-semibold font-mono text-[0.96rem]">
            {" "}
            Gateway Name
          </h5>
          <h5 className="text-xs">Your gateway name...</h5>
          <div className="w-full py-2">
            <input
              className="w-full border py-1 rounded-sm outline-green-500 px-4 text-xs h-10"
              value={data.gatewayName}
              onChange={(e) =>
                setData({ ...data, gatewayName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="px-4 border-b py-2">
          <h5 className=" font-semibold font-mono text-[0.96rem]"> RPC URL</h5>
          <h5 className="text-xs">Arbitrum mainnet rpc url</h5>
          <div className="w-full py-2">
            <input
              className="w-full border py-1 rounded-sm outline-green-500 px-4 text-xs h-10"
              value={data.rpcUrl}
              onChange={(e) => setData({ ...data, rpcUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="px-4  py-2">
          <h5 className=" font-semibold font-mono text-[0.96rem]">
            {" "}
            Your password
          </h5>
          <h5 className="text-xs">
            Keep this password handy.Make sure to never share or lose access to
            either the password.
          </h5>
          <div className="w-full py-2">
            <div className="flex space-x-3 relative">
              {/* Password Input */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border py-1 rounded-sm outline-green-500 px-4 text-xs h-10"
                  placeholder="Enter password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border py-1 rounded-sm outline-green-500 px-4 text-xs h-10"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </div>

        <div className="w-full py-4 flex flex-col px-4 space-y-4">
          <div className="w-full">
            <h5 className=" font-semibold font-sans text-[0.96rem] text-black">
              {" "}
              Choose Transcoding Profile
            </h5>
            {/* <h5 className='text-xs'>Pick the geographic region for your deployment to optimize streaming performance and comply with local regulations</h5> */}
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            {[
              {
                label: "480p0",
                desc: "h264constrainedhigh",
              },
              {
                label: "720p0",
                desc: "h264constrainedhigh",
              },
              {
                label: "1080p0",
                desc: "h264constrainedhigh",
              },
            ].map((tab, index) => {
              return (
                <div
                  className=" flex border px-4 py-6 space-x-2 cursor-pointer"
                  onClick={() => {
                    setProfile(tab?.label);
                    setData({ ...data, transcoding_profile: tab?.label });
                  }}
                  key={index}
                >
                  {data.transcoding_profile === tab?.label ? (
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
