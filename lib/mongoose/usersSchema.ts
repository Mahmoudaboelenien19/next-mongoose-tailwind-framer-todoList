import mongoose from "mongoose";
(async () =>
  await mongoose.connect(process.env.MONGODB_URI as unknown as string))();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  todos: [
    {
      content: String,
      isChecked: Boolean,
    },
  ],
});

console.log("schema is successfully working");
export const userCollection =
  mongoose.models.users || mongoose.model("users", userSchema);
