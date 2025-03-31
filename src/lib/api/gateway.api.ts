import { DeploymentParams } from "./types";
import { axiosConfig } from "./axios.config";

export const _deploy = async (data: DeploymentParams) =>
  await axiosConfig.post("/deploy_instance", data);

export const _deleteTerminal = async (data: any) =>
  await axiosConfig.post("/terminate", data);
