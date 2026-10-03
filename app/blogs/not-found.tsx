import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h2 className="text-xl font-bold text-rose-600">404 - ไม่พบบทความนี้ในระบบ</h2>
      <p className="mt-2 text-sm text-slate-500">
        รหัสบทความที่คุณค้นหาไม่มีอยู่จริง หรืออาจถูกลบออกไปแล้ว
      </p>

      <div className="mt-6">
        <Link
          href="/blogs"
          className="text-sm text-indigo-600 hover:underline"
        >
          ← ย้อนกลับไปยังหน้ารายการบทความทั้งหมด
        </Link>
      </div>
    </div>
  );
}