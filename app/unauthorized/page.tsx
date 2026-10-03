import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm p-8 text-center">
        <div className="mb-4 text-5xl">🚫</div>

        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          ไม่มีสิทธิ์เข้าถึง
        </h1>

        <p className="mb-6 text-sm text-slate-500">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้
          กรุณาติดต่อผู้ดูแลระบบหากคิดว่าคุณควรมีสิทธิ์เข้าถึง
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
          >
            กลับ Dashboard
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            หน้าแรก
          </Link>
        </div>
      </div>
    </main>
  );
}