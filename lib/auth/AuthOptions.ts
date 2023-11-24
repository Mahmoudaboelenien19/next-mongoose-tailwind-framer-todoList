import bcyrpt from "bcrypt";
import { userCollection } from "@/lib/mongoose/usersSchema";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions, Session } from "next-auth";
import { Adapter } from "next-auth/adapters";
import clientPromise from "../mongoose/mongoAdapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoose } from "../mongoose/ConnectToMongoose";
import { NextResponse } from "next/server";

(async () => await connectToMongoose())();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { type: "text" }, password: { type: "text" } },
      async authorize(credentials) {
        if (!credentials || !credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await userCollection.findOne({ email: credentials.email });

        if (user) {
          const check = bcyrpt.compareSync(
            credentials.password + process.env.BCYRPT_SECRET,
            user.password
          );
          if (check) {
            return user;
          }

          return null;
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  adapter: MongoDBAdapter(clientPromise) as Adapter,

  callbacks: {
    // async signIn(ob: any) {
    //   // { account, profile, credentials }
    //   console.log({ signin: ob });
    //   // if (account && profile && account.provider === "google") {
    //   //   const user = await userCollection.findOne({ email: profile.email });
    //   //   console.log({ profile });
    //   //   if (user) {
    //   //     return user;
    //   //   }
    //   //   return "/signin?isRegistered=false";
    //   // }

    //   // if (credentials && credentials.email) {
    //   //   const user = await userCollection.findOne({ email: credentials.email });

    //   //   if (user) {
    //   //     return user;
    //   //   }
    //   // }
    //   if (ob?.user) {
    //     return "/";
    //   } else {
    //     return false;
    //   }
    // },

    async jwt({ token, user }) {
      if (user && token) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.id as string;
        return session;
      }
      return session;
    },
  },
};
