"use client";

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { isTokenExpired } from "@/lib/cookiePaser";

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
    // "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "application/json",
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
  // const expiresAt = Number(localStorage.getItem("immmd_key"));
  const expiresAt = Number(getCookie("immmd_key"));

  if (!!expiresAt && isTokenExpired(expiresAt)) {
    try {
      const res = await refreshAccessToken();

      if (!res.ok && res.errorCode) {
        throw new ClinetError(ERROR_CODE[res.errorCode], res.errorCode);
      }
    } catch (error) {
      // 리프레시 토큰 요청 실패 시 처리
      // window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_URL}/?error=true`;
      // 위 방법은 에러를 지워버림 -> 에러바운더리 같은 걸로...
      console.error(error);
      throw error;
    }
  }

  return config;
};

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

function getCookie(cookieName: string) {
  let cookieValue = null;
  if (document.cookie) {
    const array = document.cookie.split(escape(cookieName) + "=");
    if (array.length >= 2) {
      const arraySub = array[1].split(";");
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;
}
