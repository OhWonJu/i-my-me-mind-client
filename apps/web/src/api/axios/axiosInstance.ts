import { axiosConfig } from "./axiosConfig";
import { AxiosInstanceWithGeneric } from "./axiosInstance.types";

import axios from "axios";

export const axiosInstance: AxiosInstanceWithGeneric =
  axios.create(axiosConfig);

// axiosInstance.interceptors.response.use(onResponse, onError);
// axiosInstance.interceptors.request.use(onRequest, onError);
