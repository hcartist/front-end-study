import { useRef, useEffect } from 'react';

export default function Form({ search }) {
    // 실제 엘리먼트에 접근할 수 있다
    const inputEl = useRef(null);

    // 페이지 접속 시 입력란에 포커스, 페이지 처음 접속했을때 input에 자동적으로 포커스(커서 깜빡이는거, 유저가 바로 확인하고 검색할 수 있게끔), 실제 엘리먼트에 접근해야하므로 useRef사용함, useRef라는 Hook은 current라는 속성이 있다. 그 current에 실제 엘리먼트(inputEl)를 저장한다
    // useEffect는 비동기적으로 접근하는 Hook, 비동기적으로 접근하는 이유는 (해당 코드에서는 input에 접근한다) virtual dom이 실제 문서에 주입 되고난 뒤에 접근해야하기 때문
    useEffect(() => {
        inputEl.current.focus();
    })

    return (
        <label className='block mb-4'>
            <input
            type="text"
            className='border px-2 py-1 rounded w-full outline-none'
            onChange={({ target }) => search(target.value)} // input의 value가 onChange될때(변화됐을 때) search함수가 호출된다
            placeholder='검색'
            ref={inputEl}
            />
        </label>
    )
};