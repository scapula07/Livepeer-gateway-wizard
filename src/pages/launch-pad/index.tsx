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
import { gatewayApi } from "@/firebase/gateway";
import { useUser } from "@/hooks/useUser";
import axios from "axios";

export default function LaunchPad() {
  const [next, setNext] = useState(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { user } = useUser();

  const [data, setData] = useState<DeploymentParams>({
    id: "",
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
    try {
      const gatewayResponse = await gatewayApi.createInstance(user?.id);
      const newData = { ...data, id: gatewayResponse.data?.id };
      setData(newData);
      setNext(3);
      const response = await axios.post("/api/deploy", newData);
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
            <div className="w-full h-full overlow-y-scroll">
              {error && (
                <div className="md:w-2/3 mx-auto mb-5 w-full h-full ">
                  <ErrorAlert error={error} />
                </div>
              )}
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
                <Loader data={data} isLoading={isLoading} id={data.id} />
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
