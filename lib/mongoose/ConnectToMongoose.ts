import mongoose, { connection } from "mongoose";

export const connectToMongoose = async () => {
  try {
    if (connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as unknown as string);
    } else {
      console.log("already connected");
    }
  } catch (err) {
    console.log(err);
  }
};
