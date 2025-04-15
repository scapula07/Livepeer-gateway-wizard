import axios from "axios";
// import { getAccessToken } from '../utils'

const baseUrl = "https://api.gwid.io/api/v1";

const headers = {
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Credentials": "include",
  "Content-Type": "application/json; charset=utf-8",
};

const axiosConfig = axios.create({
  baseURL: baseUrl,
  headers,
  withCredentials: true,
  timeout: 60000,
});

axiosConfig.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const uploadHeaders = {
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Credentials": "include",
  "Content-Type": "multipart/form-data",
};

export { axiosConfig };
