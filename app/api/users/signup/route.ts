import { connectToMongoose } from "@/lib/mongoose/ConnectToMongoose";
import { userCollection } from "@/lib/mongoose/usersSchema";
import { hashPassword } from "@/lib/user/hashPassword";
import { NextRequest, NextResponse } from "next/server";

(async () => await connectToMongoose())();
export const POST = async (req: NextRequest) => {
  try {
    const { email, password, name } = await req.json();
    const user = await userCollection.findOne({ email });

    if (user) {
      return NextResponse.json(
        { msg: "user already exist" },
        { status: 409, statusText: "user already exist" }
      );
    }
    const hashedPassword = hashPassword(password);
    console.log({ email, hashedPassword, name });
    const res = await userCollection.insertMany([
      {
        name,
        email,
        password: hashedPassword,
      },
    ]);

    return NextResponse.json(
      { msg: "you  successfully registered" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
  }
};
