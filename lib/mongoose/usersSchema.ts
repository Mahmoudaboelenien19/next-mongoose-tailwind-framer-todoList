import mongoose from "mongoose";
import Adapters from "next-auth/adapters";
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
