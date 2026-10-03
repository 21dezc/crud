import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        Next.js · Prisma · NextAuth
      </span>
      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
        ระบบจัดการข้อมูลนักศึกษา
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        เรียบง่าย ใช้งานไว เพิ่ม/แก้ไข/ลบข้อมูลนักศึกษาได้ในไม่กี่คลิก
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/students" className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700">ดูรายชื่อนักศึกษา</Link>
        <Link href="/login" className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">เข้าสู่ระบบ</Link>
      </div>
    </main>
  );
}
