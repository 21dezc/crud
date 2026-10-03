import prisma from "@/app/lib/prisma";
import DeleteButton from "./delete-button";

export default async function StudentsPage() {
    const students = await prisma.student.findMany({
        orderBy: {
            id: "asc",
        },
    });

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-2">
                <h1 className="text-2xl font-bold text-slate-900">
                    Student Management
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    จำนวนนักศึกษา:{" "}
                    <strong>{students.length}</strong> คน
                </p>
            </div>
            <a
                href={`/students/create`}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 my-5"
            >
                เพิ่มนักศึกษา
            </a>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3 font-medium">ID</th>
                            <th className="px-5 py-3 font-medium">
                                รหัสนักศึกษา
                            </th>
                            <th className="px-5 py-3 font-medium">
                                ชื่อ
                            </th>
                            <th className="px-5 py-3 font-medium">
                                Email
                            </th>
                            <th className="px-5 py-3 font-medium">
                                สาขา
                            </th>
                            <th className="px-5 py-3 font-medium">
                                ชั้นปี
                            </th>
                            <th className="px-5 py-3 font-medium">
                                สถานะ
                            </th>
                            <th className="px-5 py-3 font-medium">
                                จัดการ
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr
                                key={student.id}
                                className="border-t border-slate-100 hover:bg-slate-50/70"
                            >
                                <td className="px-5 py-4">
                                    {student.id}
                                </td>

                                <td className="px-5 py-4">
                                    {student.studentCode}
                                </td>

                                <td className="px-5 py-4 font-medium">
                                    {student.name}
                                </td>

                                <td className="px-5 py-4">
                                    {student.email ?? "-"}
                                </td>

                                <td className="px-5 py-4">
                                    {student.major}
                                </td>

                                <td className="px-5 py-4">
                                    {student.year}
                                </td>

                                <td className="px-5 py-4">
                                    {student.status ? (
                                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                            กำลังศึกษา
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                                            ไม่ใช้งาน
                                        </span>
                                    )}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex gap-2">
                                        <a
                                            href={`/students/edit/${student.id}`}
                                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                            แก้ไข
                                        </a>

                                        <DeleteButton id={student.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}