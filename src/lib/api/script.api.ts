import axios from "axios"
import { DeploymentParams } from "./types";
import { axiosConfig } from "./axios.config";

const baseUrl="http://localhost:3003"

export const _deploy = async (data: DeploymentParams) =>
    await axiosConfig.post("/deploy_instance", data);
