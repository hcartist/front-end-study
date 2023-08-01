import { useState, useEffect } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';

const FILTER_MAP = {
  All: () => true,
  Done: (task) => task.completed,
  Active: (task) => !task.completed
}

// Object.keys(객체): 객체의 속성이름을 문자열 배열로 리턴한다
const FILTER_NAMES = Object.keys(FILTER_MAP);

function saveDoc(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 최초 렌더링 시에 가져올 할일 리스트
const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

export default function App() {

  // 할일 목록을 저장하는 변수
  const [tasks, setTasks] = useState(initialTasks);

  // 필터
  const [filter, setFilter] = useState("All");

  // 키 스테이트 추적
  console.log(tasks);


  // 할일을 추가하는 함수
  function addTask(name) {
  console.log(name);

  // 새로운 할일 객체 생성
  const newTask = { id: `todo-${Date.now()}`, name, completed: false };
  
  const updatedTasks = [...tasks, newTask];

  // 로컬 스토리지 동기화
  saveDoc(updatedTasks);

  // tasks를 업데이트한다
  setTasks(updatedTasks);
  };

  //할일을 삭제하는 함수
  function deleteTask(id) { 
  console.log(id); // id 확인

  // tasks에서 전달받은 id와 일치하는 tak를 제외한 
  // 나머지 task를 리턴한다
  const remainingTasks = tasks.filter(task => task.id !== id);

  saveDoc(remainingTasks);

  // tasks를 업데이트한다
  setTasks(remainingTasks);
  };

  // 할일의 완료상태를 수정하는 함수
  function toggleTaskCompleted(id) {
  console.log(id); // id 확인

  // tasks에서 전달받은 id와 일치하는 task의 completed를 
  // 현재상태의 반대로 수정한다
  const updatedTasks = tasks.map(task => {
  if (task.id === id) {
  return { ...task, completed: !task.completed }
  }
  return task;
  })

  // 로컬 스토리지 동기화
  saveDoc(updatedTasks);

  // tasks를 updatedTasks로 업데이트 한다
  setTasks(updatedTasks);
  };

  // 할일을 수정하는 함수
  function editTask(id, newName) { 
  console.log(id, newName)

  const editedTask = tasks.map(task => {
  if (task.id === id) {
  return { ...task, name: newName }
  }
  return task;
  })

  saveDoc(editedTask);

  setTasks(editedTask);
  };

  // 필터버튼
  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={filter === name} // 필터와 name을 비교
      setFilter={setFilter}
    />
  ))

  // 할일 목록
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    // 컴포넌트 재사용
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      deleteTask={deleteTask}
      editTask={editTask}
      toggleTaskCompleted={toggleTaskCompleted}
    />
  ))

  return (
    <div className='max-w-sm mx-auto mt-8 border p-8 bg-white'>
      <h1 className='text-2xl font-semibold text-center mb-4'>
        할일 목록 &#128526; &#127928;
      </h1>

      <Form addTask={addTask} />

      <div className='flex felx-nowrap gap-1 mb-4'>
        {filterButtons}
      </div>

      <h2 className='text-xl mb-4'>
        <span className='font-semibold'>{taskList.length}</span>
        개 남았습니다
      </h2>

      <ul>
        {taskList}
      </ul>
    </div>
    )
};