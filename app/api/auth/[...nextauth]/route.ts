import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongoose/mongoAdapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/signin",
  },

  adapter: MongoDBAdapter(clientPromise) as Adapter,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
