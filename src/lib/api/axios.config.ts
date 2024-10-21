import axios from 'axios'
// import { getAccessToken } from '../utils'


const baseUrl = 'http://localhost:3003/api/v1'

const headers = {
  'Access-Control-Allow-Origin': true,
  'Access-Control-Allow-Credentials': 'include',
  'Content-Type': 'application/json; charset=utf-8',
}

const axiosConfig = axios.create({
  baseURL: baseUrl,
  headers,
  timeout: 60000,
  withCredentials: true,
})

axiosConfig.interceptors.request.use(
   config => {
      config.headers['Content-Type'] = 'application/json'
    return config
   },
  error => {
    return Promise.reject(error)
  },
)

const uploadHeaders = {
  'Access-Control-Allow-Origin': true,
  'Access-Control-Allow-Credentials': 'include',
  'Content-Type': 'multipart/form-data',
}


export { axiosConfig }