import mongoose from "mongoose";
import Adapters from "next-auth/adapters";

const toDoSchema = new mongoose.Schema({
  content: String,
  isChecked: Boolean,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  todos: [toDoSchema],
});

console.log("schema is successfully working ");
export const userCollection =
  mongoose.models?.users || mongoose.model("users", userSchema);
