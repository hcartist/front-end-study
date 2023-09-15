import { useRef, useEffect } from 'react';

export default function Form({ search }) {
    // 실제 엘리먼트에 접근할 수 있다
    const inputEl = useRef(null);

    // 페이지 접속 시 입력란에 포커스
    useEffect(() => {
        inputEl.current.focus();
    })

    return (
        <label className='block mb-4'>
            <input
            type="text"
            className='border px-2 py-1 rounded w-full outline-none'
            onChange={({ target }) => search(target.value)}
            placeholder='검색'
            ref={inputEl}
            />
        </label>
    )
};