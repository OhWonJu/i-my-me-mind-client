import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { cookieParser } from "@/lib/cookiePaser";
import { googleAuth } from "@/lib/actions/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUHT_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 6,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      const serviceToken = {} as { [key: string]: any };

      if (account && account.provider && account.access_token) {
        let res: Response | null = null;

        switch (account.provider) {
          case "google": {
            res = await googleAuth({
              ...account,
              email: profile?.email,
              name: profile?.name,
            });
            break;
          }
        }

        const immmdTokens =
          res?.headers
            .getSetCookie()
            .filter((token) => token.includes("immmd")) ?? null;

        if (immmdTokens && immmdTokens.length > 0) {
          // const cookieStore = await cookies();

          immmdTokens.forEach((token) => {
            const { key, value, cookieOptions } = cookieParser(token);

            serviceToken[key] = value;

            cookies().set(key, value, cookieOptions);
            // cookieStore.set(key, value, cookieOptions);
          });
        }
      }

      // 넘겨받은 토큰 전달
      return serviceToken;
    },
  },
  pages: {
    signIn: "/",
  },
  // debug: process.env.NODE_ENV === "development",
};
