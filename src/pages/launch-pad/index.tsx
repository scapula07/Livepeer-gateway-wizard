import React, { useState } from "react";
import Navigator from "@/components/launchPad/nav";
import Navbar from "@/components/navbar";
import Panel from "../../components/launchPad/panel";
import SelectStack from "@/components/launchPad/selectStack";
import Configuration from "@/components/launchPad/configuration";
import Loader from "@/components/launchPad/loader";
import { _deploy } from "@/lib/api/gateway.api";
import { DeploymentParams } from "@/lib/api/types";
import { useRouter } from "next/router";
import ErrorAlert from "@/components/ui/error-alert";

export default function LaunchPad() {
  const [next, setNext] = useState(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();
  const { id } = router.query;
  const gateway_id = id as string;

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [data, setData] = useState<DeploymentParams>({
    id: gateway_id,
    gateway_type: "",
    provider: "",
    region: "",
    gatewayName: "",
    rpcUrl: "",
    password: "",
    transcoding_profile: "",
  });

  const launch = async () => {
    setLoading(true);
    await sleep(2000);
    setNext(3);
    try {
      const response = await _deploy(data);
      response?.data && setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      setNext(2);
    }
  };

  const validateStep = () => {
    if (next === 1) {
      return data.gateway_type && data.provider;
    }
    if (next === 2) {
      return (
        data.gatewayName &&
        data.rpcUrl &&
        data.password &&
        data.password === confirmPassword &&
        data.transcoding_profile
      );
    }
    return true;
  };

  const handleClick = () => {
    setError(null);
    if (validateStep()) {
      if (next == 2) {
        launch();
      } else {
        setNext(next + 1);
      }
    } else {
      setError("Please fill in all required fields before proceeding.");
    }
  };

  return (
    <div className="w-full h-full overflow-y-hidden font-mono">
      <Navbar />
      <div className="w-full flex justify-center md:px-10 px-5 h-full overflow-y-scroll">
        <div className="w-full h-full md:border-l-2">
          <Navigator />
          <div className="flex md:flex-row flex-col md:space-y-0 space-y-6 w-full">
            <div className="md:w-1/3 w-full h-full ">
              <Panel next={next} />
            </div>

            {error && (
              <div className="md:w-2/3 w-full h-full ">
                <ErrorAlert error={error} />
              </div>
            )}

            <div className="w-full h-full overlow-y-scroll">
              {next === 1 && <SelectStack data={data} setData={setData} />}
              {next === 2 && (
                <Configuration
                  data={data}
                  setData={setData}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                />
              )}
              {next === 3 && (
                <Loader data={data} isLoading={isLoading} id={gateway_id} />
              )}
              {next != 3 && (
                <div className="w-full flex justify-end space-x-4 py-4">
                  <button
                    className="text-sm font-semibold"
                    onClick={() => setNext(next - 1)}
                    disabled={next === 1}
                  >
                    Cancel
                  </button>

                  <button
                    className={`bg-orange-500 px-6 font-semibold py-3 text-xs rounded-sm transition duration-300 ease-in-out ${
                      isLoading || !validateStep()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handleClick}
                    disabled={isLoading || !validateStep()}
                  >
                    {next === 2 ? "Launch" : "Next"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
