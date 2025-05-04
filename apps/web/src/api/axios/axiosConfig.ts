"use client";

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
