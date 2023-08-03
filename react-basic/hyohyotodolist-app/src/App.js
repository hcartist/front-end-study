import { useState, useEffect } from "react"
import Form from './components/Form';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';

export default function App() {

    function addtask() { 
    
    };

    function deletetask() { };


    return (
        <div className="h-[40rem] w-[25rem]">

            {/* 날짜*/}
            <h1 className="text-3xl font-semibold">2023/08/03</h1>

            {/* 대지 */}
            <div className="p-4 m-auto mt-[0.5rem] h-[40rem] bg-white drop-shadow-2xl rounded-[1rem]">
                <h1 className="text-base font-regular mb-3"><b className="text-cyan-500">0</b>개의 일이 남았습니다.</h1>

                <div className="flex">
                    <input
                        type="text"
                        className="m-auto w-full p-2.5 p-2 border"></input>
                        <button className="bg-cyan-400 p-2 text-white hover:bg-violet-600">add</button>
                </div>
            </div>
        </div>

    )
};