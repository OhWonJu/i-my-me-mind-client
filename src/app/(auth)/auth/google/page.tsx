"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { _GET } from "@/api/rootAPI";

const GoogleAuthPage = () => {
  const { data, error } = useQuery({
    queryKey: ["test"],
    queryFn: async () => _GET(`/users/token`),
  });

  return <div>login...</div>;
};

export default GoogleAuthPage;
