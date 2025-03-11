import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // گرفتن توکن از کوکی‌ها
  const { pathname } = req.nextUrl; // مسیر صفحه درخواستی

  // مسیرهای محافظت‌شده که فقط کاربران لاگین‌شده به آن‌ها دسترسی دارند
  const protectedRoutes = ["/orders"];

  // جلوگیری از نمایش صفحه لاگین/ثبت‌نام به کاربرانی که وارد شده‌اند
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/orders", req.url)); // هدایت به داشبورد
  }

  // جلوگیری از دسترسی کاربران مهمان به صفحات محافظت‌شده
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url)); // هدایت به صفحه ورود
  }

  return NextResponse.next(); // ادامه مسیر عادی برای صفحات دیگر
}

export const config = {
  matcher: ["/login", "/orders"], // مسیرهایی که Middleware بررسی می‌کند
};
