import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { test, TODOAPI } from '../../utils/links';

const CreateTodo = ({ setTodoList }) => {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")



  const addTodo = async () => {
    if (title === "" || description === "") {
      toast('Please fill all fields',
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    } else {

      const response = await fetch(TODOAPI, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      toast('Task added',
        {
          icon: '✅',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      const data = await response.json()
      console.log(data)
      setTodoList((prev) => [data.data, ...prev])
      setTitle("")
      setDescription("")
    }
  }


  const removeTodo = () => {

  }


  return (
    <div className='flex  w-1/2 items-center  flex-col  gap-4 p-8    '>
      <input onChange={(e) => {
        const value = e.target.value
        setTitle(value)
      }} value={title} className="text-2xl rounded-none w-full placeholder:text-neutral-300 md:text-4xl bg-neutral-900  border-white focus:outline-none text-white font-bold p-2" placeholder="add task " type="text" />



      <input onChange={(e) => {
        const value = e.target.value
        setDescription(value)
      }} value={description} className="rounded-none w-full text-base   md:text-xl placeholder:text-neutral-200 bg-neutral-900  border-white focus:outline-none text-white    p-2 " placeholder="description" type="text" />


      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <button onClick={addTodo} className="    bg-neutral-800 border border-white px-2 py-1 md:px-4 md:py-2 rounded-lg text-white text-base md:text-lg hover:bg-neutral-800">add task</button>
      {/* <button onClick={removeTodo} className=" w-1/2   bg-neutral-800 border border-white px-4 py-2 rounded-lg text-white text-lg hover:bg-neutral-800">remove all </button> */}
    </div>
  )
}

export default CreateTodo