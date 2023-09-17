import { useState } from "react";

export default function Form({ handleAddComment }) {
    // content > 댓글 내용 관리하는 변수
    const [content, setContent] = useState("");

    // handleSubmit > 폼 제출처리
    async function handleSubmit(e) { 
        try {
            e.preventDefault();

            await handleAddComment(content); // handleAddComment > Comments.js의 38번째 줄에 선언되어 있음

            // 댓글 창 비우기(댓글 달고 난 뒤), 27번째 줄 value를 빈 문자열로 비우는 것
            setContent("");

        } catch (error) {
            alert(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <textarea
                row="2"
                className="border w-full px-2 py-1 rounded resize-none"
                value={content}
                onChange={({ target }) => setContent(target.value)}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-[0.2]"
                disabled={!content.trim()} // 내용이 없을 경우 button 비활성화
            >
                댓글 달기
            </button>
        </form>
    )
};