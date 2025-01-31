"use client";

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { ERROR_CODE, ErrorCode, ErrorMessage } from "../errorCode";

class ClinetError extends Error {
  errorCode: string;

  constructor(message: string, errorCode: string) {
    super(message);
    this.errorCode = errorCode;
  }
}

export const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.data.errorCode) {
    throw new ClinetError(response.data.errorMessage, response.data.errorCode);
  }

  return response.data;
};

export const onError = (error: AxiosError) => {
  const response = error.response as AxiosResponse;

  if (response?.data) {
    throw new ClinetError(response.data.message, response.data.statusCode);
  }

  throw error;
};

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  const expiresAt = Number(localStorage.getItem("immmd_key"));

  if (!!expiresAt && isTokenExpired()) {
    try {
      const res = await refreshAccessToken();

      if (!res.ok && res.errorCode) {
        throw new ClinetError(ERROR_CODE[res.errorCode], res.errorCode);
      }

      if (res.immmd_key) {
        localStorage.setItem("immmd_key", res.immmd_key);
      } else {
        localStorage.setItem("immmd_key", "");
      }
    } catch (error) {
      // 리프레시 토큰 요청 실패 시 처리
      // window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_URL}/?error=true`;
      // 위 방법은 에러를 지워버림 -> 에러바운더리 같은 걸로...
      console.error(error);
      localStorage.setItem("immmd_key", "");
      throw error;
    }
  }

  return config;
};

function isTokenExpired() {
  // const expiresAt = getExpiresAt();
  const expiresAt = Number(localStorage.getItem("immmd_key"));

  if (!expiresAt) return true;

  const currentTime = Date.now();
  const TEN_MINUTES_AGO_IN_MS = 60 * 10 * 1000;

  // console.log(expiresAt * 1000);
  // console.log(currentTime + TEN_MINUTES_AGO_IN_MS);

  // 만료시간이 10분 이내로 떨어지면 토큰을 갱신해준다.
  return expiresAt * 1000 < currentTime + TEN_MINUTES_AGO_IN_MS;
}

interface RefreshResponse {
  ok: boolean;
  immmd_key: string;
  error?: ErrorMessage;
  errorCode?: ErrorCode;
}

// 새로운 액세스 토큰을 요청하는 함수
async function refreshAccessToken() {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/v1/refresh`,
    {},
    {
      withCredentials: true, // 쿠키 포함
    }
  );

  return response.data as RefreshResponse;
}
