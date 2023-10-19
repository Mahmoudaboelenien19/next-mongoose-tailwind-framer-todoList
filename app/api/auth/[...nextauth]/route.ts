import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/AuthOptions";
import { connectToMongoose } from "@/lib/mongoose/ConnectToMongoose";
(async () => await connectToMongoose())();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
