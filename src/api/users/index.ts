import { queryOptions } from "@tanstack/react-query";

import { _GET, _POST, _PUT } from "@/api/rootAPI";
import { CommonResponse } from "@/api/axios/axiosInstance.types";

export interface GetImmmdKeyResponse {
  immmdKey: string | null;
}

export interface CurrentUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface LogOutResponse extends CommonResponse {}

export const usersQueryKeys = {
  getImmmdKey: ["users", "immmdKey"] as const,
  currentUser: ["users", "currentUser"] as const,
  logout: ["users", "logout"] as const,
};

export function checkImmmdConnection() {
  return queryOptions({
    queryKey: usersQueryKeys.getImmmdKey,
    queryFn: async () => _GET<GetImmmdKeyResponse>("/users/immmdkey"),
  });
}

export function getCurrentUser(flag: boolean | undefined) {
  return queryOptions({
    queryKey: usersQueryKeys.currentUser,
    queryFn: async () => _GET<CurrentUserResponse>("/users/current"),
    enabled: flag,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export async function logOutMutate() {
  const res = await _POST<LogOutResponse>("/auth/logout");

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}

export async function deleteUserMutate() {
  const res = await _PUT<CommonResponse>("/users/delete/user");

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}
