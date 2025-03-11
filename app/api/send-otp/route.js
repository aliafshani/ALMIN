import { connectDB } from "@/lib/db";
import User from "@/backend/models/User";

export async function POST(req) {
  await connectDB();
  const { phone } = await req.json();

  if (!phone) return Response.json({ error: "شماره موبایل الزامی است" }, { status: 400 });

  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // تولید کد ۴ رقمی
  console.log(otp);


  await User.findOneAndUpdate({ phone }, { otp }, { upsert: true, new: true });

  return Response.json({ success: true, message: "کد تایید ارسال شد", otp }); // اینجا باید SMS بفرستی
}
