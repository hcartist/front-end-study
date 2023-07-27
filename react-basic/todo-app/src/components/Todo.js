import { useState, useEffect, useRef } from "react";

export default function Todo({
    id,
    name,
    completed,
    deleteTask,
    toggleTaskCompleted,
    editTask
}) {
    // 편집 상태 관리
    const [isEditing, setIsEditing] = useState(false);
    // 할일의 새로운 이름
    const [newName, setNewName] = useState("");

    // 폼 제출처리
    function handleSubmit(e) { }

    // 수정 취소 처리
    function handleCancel() { }

    const viewTemplate = (
        <>
            <div className="flex mb-2">
                <label>
                    <input
                        type="checkbox"
                        className="peer hidden"
                        checked={completed}
                        onChange={() => toggleTaskCompleted(id)}
                    />
                    <span className="text-xl peer-checked:line-through">
                        {name}
                    </span>
                </label>
            </div>
            <div className="flex flex-nowrap gap-1">
                <button
                    onClick={() => setIsEditing(true)}
                    className="border-2 font-semibold px-2 py-1 w-full mb-2">
                    수정
                </button>
                <button
                    className="px-2 py-1 w-full mb-2 bg-red-500 text-white font-semibold"
                    onClick={() => deleteTask(id)}>
                    삭제
                </button>
            </div>
        </>
    )

    const editingTemplate = (
        <>
            Editing Template
        </>
    )

    return (
        <li className="mb-4">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    )
};