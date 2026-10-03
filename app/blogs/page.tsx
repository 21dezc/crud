import Blogs from "@/app/ui/blogs";
import MyFallback from "../ui/my-fallback";
import { Suspense } from "react";
import { BlogListSkeleton } from "../ui/my-skeleton";

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">ยินดีต้อนรับสู่บล็อกข่าวสาร</h1>
        <p className="mt-1 text-sm text-slate-500">บทความเทคโนโลยีและข่าวสารอัปเดตล่าสุด</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold">รายการบทความ</h2>
        <Suspense fallback={<BlogListSkeleton />}>
        <Blogs />
        </Suspense>
      </section>
    </main>
  );
}