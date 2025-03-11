import { connectDB } from "@/lib/db";
import User from "@/backend/models/User";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await connectDB();
  const { phone, otp } = await req.json();

  const user = await User.findOne({ phone });

  if (!user || user.otp !== otp) {
    return Response.json({ error: "کد وارد شده صحیح نیست" }, { status: 400 });
  }

  const token = jwt.sign({ id: user._id, phone }, SECRET, { expiresIn: "7d" });

  await cookies().set("token", token, { httpOnly: true, path: "/" });

  return Response.json({ success: true, message: "ورود موفقیت‌آمیز", token });
}
