import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { studentSchema } from "../validation";


async function createStudent(formData: FormData) {
    "use server";

    const studentCode = formData.get("studentCode") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const major = formData.get("major") as string;
    const year = Number(formData.get("year"));

    await prisma.student.create({
        data: {
            studentCode,
            name,
            email: email || null,
            major,
            year,
        },
    });

    redirect("/students");
}

export default function CreateStudentPage() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    เพิ่มนักศึกษา
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    กรอกข้อมูลนักศึกษา
                </p>
            </div>

            <form
                action={createStudent}
                className="space-y-5 rounded-2xl border border-slate-200 bg-white shadow-sm p-6"
            >
                <div>
                    <label
                        htmlFor="studentCode"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        รหัสนักศึกษา
                    </label>

                    <input
                        id="studentCode"
                        type="text"
                        name="studentCode"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        ชื่อ-นามสกุล
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="major"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        สาขา
                    </label>

                    <input
                        id="major"
                        type="text"
                        name="major"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="year"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        ชั้นปี
                    </label>

                    <input
                        id="year"
                        type="number"
                        name="year"
                        min="1"
                        max="8"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
                    />
                </div>

                <div className="flex gap-3 border-t border-slate-100 pt-5">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                    >
                        บันทึก
                    </button>

                    <a
                        href="/students"
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    >
                        ยกเลิก
                    </a>
                </div>
            </form>
        </main>
    );
}