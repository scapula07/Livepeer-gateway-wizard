import { axiosConfig } from "./axios.config";
import { DeploymentParams } from "./types";

export const _deploy = async (data: DeploymentParams) =>
  await axiosConfig.post(data?.gateway_type==="ai"?"/deploy-ai":"/deploy-transcoding", data);