import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'

function App() {
  const [todoList, setTodoList] = useState([]);

  return (
    <div className=' flex flex-col items-center text-white'>

      <CreateTodo setTodoList={setTodoList} />
      <Todos todoList={todoList} setTodoList={setTodoList} />
    </div>

  )
}

export default App
