import { useState } from 'react';

// 저장
function saveDoc() {
  localStorage.setItem("name", JSON.stringify());
}

// 초기name
const initialName = JSON.stringify(localStorage.getItem("name") || "[]")

// App 구조
export default function App() {

  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);

  console.log(tasks) // 키스테이트 추적

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      name: name,
      completed: false
    }
    setTasks([...tasks, newTask])
    setName("")
  }

  function deleteTasks(id) {
    const deleteTasks3 = tasks.filter(task => task.id !== id)
    setTasks(deleteTasks3)

    // 1. click한 task의 id를 가져온다
    // 2. taks(걍 전체 tasks) filter에 조건을 넣는다(조건내용해석: task(전체 tasks의 개별 task) => task.id(그 개별 task의 id)와 id(내가 click한 ^해당^ task의 id)를 비교한다.) !== 같지 않음을 확인
    // 3. 내가 선택한 task의 id랑 다른 task.id들만 남긴다 > 이 내용이 filter의 조건
    // 4. 해당 filter를 deleteTasks3에 적용
    // 5. deleteTasks > setTasks > tasks
    // 6. tasks > taskList의 tasks.map에 리턴됨

    // filter예제 w3school filter 예제 확인하기
  }

  function Done_underlin(id) {
    console.log(id);

    const Done_underlin2 = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    })

    setTasks(Done_underlin2);
  }


  const taskList = tasks.map(task => (
    // taks = tasks(usestate에 있는거)의 개개별 task를 지칭

    <div key={task.name}
      className='flex max-w-[25rem] mt-2 justify-between justify-center items-center mb-8'
    >
      <p className={task.completed && "line-through"}>{task.name}</p>
      <div>
        <button
          onClick={() => deleteTasks(task.id)}
          className='p-2 font-semibold text-zinc-300 hover:text-black'
        >Delete</button>

        <button
          className="p-2 font-semibold text-zinc-300 hover:text-red-500"
          onClick={() => Done_underlin(task.id)}
        >
          Done</button>
      </div>
    </div>
  ))


  return (
    <>
      {/* 전체 대지(투명) */}
      <div className="h-[40rem] w-[25rem]">

        {/* 날짜*/}
        <h1 className="text-3xl font-semibold p-3">2023/08/03</h1>

        {/* name 대지 */}
        <div className="p-4 m-auto h-[40rem] bg-white drop-shadow-2xl rounded-[1rem]">
          {/* name count */}
          <h1 className="text-base font-semibold mb-3"><b className="text-cyan-500">{taskList.length}</b>개의 일이 남았습니다.</h1>

          {/* form */}
          <form className="flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="m-auto w-full p-2.5 p-2 border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="bg-cyan-400 p-2 text-white font-semibold hover:bg-violet-600"
              type='submit'
            >add</button>
          </form>

          {/* nameList */}
          <div className='h-[30rem] overflow-scroll'>
            <ul>
              {taskList}
            </ul>
          </div>


          <div className='flex flex-nowrap gap-1'>
            <button className='w-full mt-3 h-[2rem] justify-center items-center bg-cyan-400 text-white font-semibold'>All</button>
            <button className='w-full mt-3 h-[2rem] justify-center items-center bg-red-500 text-white font-semibold'>Done</button>
          </div>
        </div>
      </div>


    </>
  )
}