import React, { useState } from 'react';

const CreateTodo = ({setTodoList}) => {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")

  const addTodo = async () => {
    
    const response = await fetch('http://localhost:3000/todo', {
      method: "POST",
      body: JSON.stringify({
        //body can be modified
        title: title,
        description: description
      }),
      headers: {
        "Content-Type": "application/json"
      }
      
    });

    // alert('data added')
    const data = await response.json()
    setTodoList((prev) => [data.data,...prev ])

  }


const removeTodo =()=> {

}


  return (
    <div className='flex  w-1/2 items-center  flex-col  gap-4 p-8    '>
      <input onChange={(e) => {
        const value = e.target.value
        setTitle(value)
      }} className=" rounded-none w-full placeholder:text-neutral-300 text-4xl bg-neutral-900  border-white focus:outline-none text-white font-bold p-2    " placeholder="add task " type="text" />



      <input onChange={(e) => {
        const value = e.target.value
        setDescription(value)
      }} className="rounded-none w-full   text-xl placeholder:text-neutral-200 bg-neutral-900  border-white focus:outline-none text-white    p-2 " placeholder="description" type="text" />


      <button onClick={addTodo} className="    bg-neutral-800 border border-white px-4 py-2 rounded-lg text-white text-lg hover:bg-neutral-800">add task</button>
      {/* <button onClick={removeTodo} className=" w-1/2   bg-neutral-800 border border-white px-4 py-2 rounded-lg text-white text-lg hover:bg-neutral-800">remove all </button> */}
    </div>
  )
}

export default CreateTodo