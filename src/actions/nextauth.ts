import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticate } from "./auth/login-user";
import GoogleProvider from "next-auth/providers/google";
import { registerNewUser } from "./auth/register-new-user";
import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await authenticate(email, password);

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, trigger, session }) {
      console.log("account", account);

      if (account && account.type === "credentials") {
        token.userId = account.providerAccountId;
      }
      if (account && account.type === "oauth") {
        token.userId = account.providerAccountId;
      }

      if (trigger === "update" && session) {
        token = { ...token, user: session };
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      console.log("session", session);

      session.user.id = token.userId;
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl);

      if (url.startsWith(baseUrl) && !url.includes("login")) {
        return url;
      }

      return baseUrl + "/home";
    },
  },
  events: {
    async signIn({ user, account }) {
      const email = user.email;

      const payload = {
        name: user.name,
        provider: account.provider,
        providerId: account.providerAccountId,
        email: user.email,
        avatar: user.image,
        businessName: user.name,
      };

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      console.log("existingUser", existingUser);
      

      if (!existingUser) {
        await registerNewUser(payload).catch((e) => {
          console.log(e);
        });
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
