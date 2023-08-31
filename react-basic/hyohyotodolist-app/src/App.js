import { useState } from 'react';



// 저장 영역
function saveDoc(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
// 저장 영역


// 기본 구조 시작
export default function App() {

  const [tasks, setTasks] = useState(initialTasks);
  console.log(tasks);



  function addTask(name) {
    const newTask = { id: `todo-${Date.now()}`, name, completed: false };

    const updatedTasks = [...tasks, newTask];

    saveDoc(updatedTasks);

    setTasks(updatedTasks);
  };



  function Form({ addTask }) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
      e.preventDefault();
      addTask(name);
      setName("")
    }

    return (
      <form
        onSubmit={handleSubmit}>
        <input
          type="text"
          className='border p-2'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className='border'>
          추가하기
        </button>
      </form>
    )
  }



  function Todo({ id, name, completed, deleteTask, toggleTaskCompleted, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);
    console.log(setIsEditing)
    function handleSubmit(e) {
      e.preventDefault();
      editTask(id, newName);
      setIsEditing(false);
    }

    function handleCancel() {
      setIsEditing(false)
      setNewName(name)
    }

    const viewTemplate = (
      <>
        <div>
          <label>
            <input
              type="checkbox"
              className='peer hidden'
              checked={completed}
              onChange={() => toggleTaskCompleted(id)}
            />
            <span
              className='peer-checked:line-through'
            >{name}</span>
          </label>
        </div>

        <div>
          <button
            onClick={() => setIsEditing(true)}>
            수정
          </button>

          <button
            onClick={() => deleteTask(id)}
          >삭제</button>
        </div>
      </>
    )

    const editingTemplate = (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-2"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <div>
          <button
            type="button"
            onClick={handleCancel}>
            취소
          </button>

          <button
            type="submit"
            disabled={name === newName}>
            저장
          </button>
        </div>
      </form>)

    return (
      <li className="mb-4">
        {isEditing ? editingTemplate : viewTemplate}
      </li>
    )
  }



  function toggleTaskCompleted(id) {
    console.log(id)
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    })

    saveDoc(updatedTasks);

    setTasks(updatedTasks);
  }



  function deleteTask(id) {
    console.log(id)

    const remainingTasks = tasks.filter(task => task.id !== id);

    saveDoc(remainingTasks)

    setTasks(remainingTasks)
  }



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



  const FILTER_MAP = {
    All: () => true,
    Done: (task) => task.completed,
    Active: (task) => !task.completed
  }



  const [filter, setFilter] = useState("All");



  const FILTER_NAMES = Object.keys(FILTER_MAP);



  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={filter === name} // 필터와 name을 비교
      setFilter={setFilter}
    />
  ))



  function FilterButton({ name, isPressed, setFilter }) {
    return (
      <button
        className={"border-2 border-black p-1 w-1/3 border font-semibold " +
          (isPressed && "bg-black text-white")}
        onClick={() => setFilter(name)}
      >
        {name}
      </button>
    )
  };



  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
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
    <>
      <div>할일 목록</div>

      <Form addTask={addTask} />

      <div>{filterButtons}</div>

      <div>{taskList.length}개 남았습니다</div>

      <ul>
        {taskList}
      </ul>
    </>
  )
}
