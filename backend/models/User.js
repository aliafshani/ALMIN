import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
