"use client";

import { PropsWithChildren, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getCurrentUser,
  checkImmmdConnection,
  logOutMutate,
} from "@/api/users";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuthStore } from "@/stores/useAuthStore";
import useMeStore from "@/stores/useMeStore";

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [expiresAt, setExpiresAt] = useLocalStorage("immmd_key");
  const { isLogin, setIsLogin } = useAuthStore();
  const { initMe, setMe } = useMeStore();

  const { data: keyData } = useQuery(checkImmmdConnection());
  const { mutate: logOut } = useMutation({
    mutationFn: async () => await logOutMutate(),
  });
  const flag = useMemo(() => !!expiresAt && !!keyData?.immmdKey, [expiresAt]);

  useEffect(() => {
    if (keyData?.immmdKey) {
      setExpiresAt(keyData.immmdKey);
    }
  }, [keyData]);

  const { refetch } = useQuery(getCurrentUser(!!flag));

  const preload = async () => {
    if (flag) {
      const currentUser = (await refetch()).data ?? null;

      if (!currentUser) {
        initMe();
        setIsLogin(false);
        setExpiresAt("");
        logOut();
      } else {
        setMe(currentUser);
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await preload();
      } catch (e) {
        console.warn("PRELOAD_ERROR", e);
      } finally {
        sessionStorage.clear();
      }
    };
    prepare();
  }, [isLogin, flag]);

  // if (isLoading) return null;

  return <>{children}</>;
};

export default AuthProvider;
