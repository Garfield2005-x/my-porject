import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// ✅ ใช้ mongoose.models เพื่อตรวจสอบว่ามีโมเดลอยู่แล้วหรือไม่
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
