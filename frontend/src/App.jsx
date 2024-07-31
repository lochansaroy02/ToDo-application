import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'

function App() {
    

  const todos = [
    {
      title:" Go to gym",
      description:"wake up at 6 am and go to gym"

    },{
      title: "complete the assignment",
      description: 'complete the assignment before 7pm '
    }
  ]
  return (
    <div className=' flex flex-col items-center text-white'>

      <CreateTodo />
      <Todos  />
    </div>

  )
}

export default App
