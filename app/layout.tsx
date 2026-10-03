import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Manager",
  description: "ระบบจัดการข้อมูลนักศึกษา",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-indigo-600 text-sm text-white">S</span>
              Student Manager
            </Link>
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Link href="/students" className="rounded-lg px-3 py-1.5 hover:bg-slate-100">นักศึกษา</Link>
              <Link href="/blogs" className="rounded-lg px-3 py-1.5 hover:bg-slate-100">บล็อก</Link>
              <Link href="/login" className="rounded-lg px-3 py-1.5 hover:bg-slate-100">เข้าสู่ระบบ</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
