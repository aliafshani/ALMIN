"use client"; // Required for Next.js 13+ (App Router)

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Install with `npm install lucide-react`
import Link from "next/link";

export default function Navbar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen" dir="rtl">
      {/* Navbar */}
      <nav className="text-white bg-fuchsia-950">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Menu Icon for Small Screens */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Brand Name for Medium Screens and Larger */}
          <Link href="/" className="hidden md:block text-xl font-bold">
            Almin Media
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 ">
            <li className="hover:text-gray-200">
              <Link href="/orders">سفارشات</Link>
            </li>
            <li className="hover:text-gray-200">
              <Link href="/about">تصویه </Link>
            </li>
            <li className="hover:text-gray-200">
              <Link href="/services">خدمات</Link>
            </li>
            <li className="hover:text-gray-200">
              <Link href="/contact">تیکت</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Sidebar (RTL) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 text-white bg-fuchsia-950 transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 md:hidden`}
      >
        <button
          className="absolute top-4 left-4"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>
        <ul className="mt-16 space-y-6 p-4 text-right">
          <li className="hover:text-gray-200">
            <Link href="/orders" onClick={() => setIsOpen(false)}>سفارشات</Link>
          </li>
          <li className="hover:text-gray-200">
            <Link href="/about" onClick={() => setIsOpen(false)}>تصویه</Link>
          </li>
          <li className="hover:text-gray-200">
            <Link href="/services" onClick={() => setIsOpen(false)}>خدمات</Link>
          </li>
          <li className="hover:text-gray-200">
            <Link href="/contact" onClick={() => setIsOpen(false)}>تیکت</Link>
          </li>
        </ul>
      </div>

      {/* Page Content (Children) */}
      <main className="p-4 text-right">
        {children}
      </main>
    </div>
  );
}
