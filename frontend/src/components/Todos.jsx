import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TODOAPI } from '../../utils/links';


const Todos = ({ todoList, setTodoList }) => {

  const getData = async () => {
    const data = await fetch(TODOAPI);
    const json = await data.json();
    setTodoList(json.messege)
    json.messege.map((item) => {
    })
  }


  useEffect(() => {
    getData()
  }, []);


  const handleDelete = async (id) => {
    // setTodoList(todoList => todoList.filter(todo => todo._id !== id));
    // setTodoList(todoList => todoList.filter(todo => todo._id !== id));
    const response = await fetch(TODOAPI, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    const newTodo = await response.json()
    // console.log(newTodo.data)
    setTodoList(newTodo.data)
    toast('Task deleted',
      {
        icon: '❌ ',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );


    // getData()


  }


  const handleCompleted = async (id) => {
    try {
      const response = await fetch(TODOAPI, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        console.error('Failed to update');
        alert("Update failed");
      } else {
        const data = await response.json()
        const id = data.id;
        setTodoList((prev) => prev.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              completed: true
            }
          }
          return item;
        }
        ))

        toast('Task completed',
          {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );


      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className='w-1/2 flex flex-col '>
      {todoList.reverse().map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row bg-neutral-900 border m-2  justify-between border-neutral-100 px-4 py-2 rounded-xl md:rounded-lg"
        >
          <div className="flex flex-col md:mr-12">
            <h1 className="text-base md:text-2xl">{item.title}</h1>
            <h3 className="text-sm md:text-base">{item.description}</h3>
            <h4>{item.completed}</h4>
          </div>


          <div className='gap-5 mt-4 flex items-center'>

            <Toaster
              position="top-right"
              reverseOrder={false}
            />
            <button className='text-sm' onClick={() => handleCompleted(item._id)}>
              {!item.completed ? '⭕' : '✅'}
            </button >

            <button className='text-sm' onClick={() => handleDelete(item._id)}>
              ❌
            </button>
          </div>


        </div>
      ))}
    </div>

  )
}

export default Todos;