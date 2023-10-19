import { userCollection } from "@/lib/mongoose/usersSchema";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import clientPromise from "../mongoose/mongoAdapter";
import CredentialsProvider from "next-auth/providers/credentials";
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
        console.log(credentials);
        if (!credentials || credentials?.email || !credentials?.password)
          return null;

        const user = await userCollection.findOne({ email: credentials.email });
        if (user.length) {
          return user[0];
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
    // async signIn({ account, profile, verificationRequest, credentials }: any) {
    //   if (account.provider === "google") {
    //     console.log({ credentials });
    //     const check = await userCollection.find({ email: profile.email });
    //     console.log({ profile, verificationRequest });
    //     if (Boolean(check.length)) {
    //       return true;
    //     }
    //     return "/signin?isRegistered=false";
    //   }
    //   return "/signin?isRegistered=false";
    // },
  },
};
