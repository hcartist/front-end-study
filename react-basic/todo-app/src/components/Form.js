import { useState } from "react";

export default function Form({ addTask }) {
    // name: 추가할 할일의 이름
    const [name, setName] = useState("");

    console.log(name) // name 추적

    // 폼 제출처리 함수
    function handleSubmit(e) {
        e.preventDefault();
        addTask(name);
        // 폼을 제출한 뒤 입력란을 비운다
        setName("")
    }

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <input
                type="text"
                className="border p-2 w-full mb-2"
                value={name}
                // change이벤트: input의 값이 바뀌는 것
                onChange={(e) => setName(e.target.value)}
                // 자동완성
                autoComplete="off"
            />
            <button
                type="submit"
                className="p-1 w-full disabled:opacity-50 bg-blue-500 text-white font-semibold"
                disabled={!name.trim()}
                >
                추가하기
            </button>
        </form>
    )
};