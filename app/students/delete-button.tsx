"use client";

import { deleteStudent } from "./actions";

type DeleteButtonProps = {
    id: number;
};

export default function DeleteButton({
    id,
}: DeleteButtonProps) {
    async function handleDelete() {
        const confirmed = window.confirm(
            "คุณต้องการลบนักศึกษาคนนี้ใช่หรือไม่?"
        );

        if (!confirmed) {
            return;
        }

        await deleteStudent(id);
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100"
        >
            ลบ
        </button>
    );
}