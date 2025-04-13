import { atom } from "recoil";

export const userStore = atom({
  key: "userStore",
  default: {},
});

export const gatewayStore = atom({
  key: "gatewayStore",
  default: {},
});

export type GATEWAY = {
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
