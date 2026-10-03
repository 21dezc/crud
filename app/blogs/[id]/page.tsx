import { notFound } from "next/navigation";

interface Blog {
  id: string;
  title: string;
}

const res = await fetch("https://api.vercel.app/blog");
const blogs: Blog[] = await res.json();

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = blogs.find((x) => x.id == id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
    </main>
  );
}
