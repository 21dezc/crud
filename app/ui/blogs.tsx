interface Blog {
  id: string;
  title: string;
}

export default async function Blogs() {
  await new Promise((resolve) => setInterval(resolve, 3000)); // หน่วง 3 วิ (ทดสอบเท่านั้น)

  const res = await fetch("https://api.vercel.app/blog");
  const blogs: Blog[] = await res.json();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {blogs.map((blog) => (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 transition hover:-translate-y-0.5 hover:shadow-md" key={blog.id}>
          <div className="mb-4 grid h-32 place-items-center rounded-xl bg-gradient-to-br from-indigo-50 to-sky-50 text-3xl font-bold text-indigo-300">{blog.id}</div>

          <div className="mb-3 font-semibold">{blog.title}</div>

          <div className="space-y-2">
            <div className="h-4 rounded w-full"></div>
            <div className="h-4 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}