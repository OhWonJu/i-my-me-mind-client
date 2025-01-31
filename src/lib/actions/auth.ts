"use server";

import { _POST } from "@/api/rootAPI";
import { Account } from "next-auth";
import { ProviderType } from "next-auth/providers/index";

interface GoogleAccount extends Account {
  type: ProviderType;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  email?: string;
  name?: string;
}

export async function googleAuth(data: GoogleAccount) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/v1/oauth`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return response;
}
