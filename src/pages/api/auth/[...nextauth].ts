import NextAuth, { Session } from "next-auth";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import { userLogin } from "@/apis/auth";
import { NextApiRequest, NextApiResponse } from "next";

const credentialsProviderOption = (req: NextApiRequest, res: NextApiResponse): CredentialsConfig<{}> => {
  return {
    type: "credentials",
    id: "login-credentials",
    name: "login-credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: Record<string, unknown> | undefined) {
      try {
        const user = await userLogin({
          id: credentials!.username as string,
          password: credentials!.password as string,
        });

        if (user) {
          const cookies = user.headers.get("set-cookie");
          res.setHeader("Set-Cookie", cookies!);
          return {
            id: "1",
            login: "admin",
            name: "관리자",
          };
        } else {
          // 로그인 실패
          throw new Error("Invalid ID or Password");
        }
      } catch (error) {
        throw new Error(error + "");
      }
      return null;
    },
  };
};

// const googleProviderOption: OAuthUserConfig<{}> = {
//   clientId: process.env.GOOGLE_CLIENT_ID || "",
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//   profile: (profile: any) => ({ ...profile, id: profile.sub, login: profile.email, image: profile.picture }),
// };
//
// const githubProviderOption: OAuthUserConfig<{}> = {
//   clientId: process.env.GITHUB_CLIENT_ID || "",
//   clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//   profile: (profile: any) => ({ ...profile, image: profile.avatar_url }),
// };

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    pages: {
      signIn: "/login",
      verifyRequest: "/login?verify=1",
      error: "/login",
    },
    providers: [
      CredentialsProvider(credentialsProviderOption(req, res)),
      // GoogleProvider(googleProviderOption),
      // GithubProvider(githubProviderOption),
    ],
    callbacks: {
      jwt({ token, user }) {
        if (user) {
          token.sub = (user as Session["user"]).id;
          token.name = (user as Session["user"]).login;
        }
        return token;
      },
      session({ session, token }) {
        session.user = { ...session.user, id: token.sub as string, name: token.name as string };
        return session;
      },
    },
  });
}
