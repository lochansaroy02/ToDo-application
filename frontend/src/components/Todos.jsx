import React, { useEffect, useState } from 'react';

const Todos = () => {

  const [todoData, setTodoData] = useState([])

  const getData = async () => {
    const data = await fetch('http://localhost:3000/todo', {

    });
    const json = await data.json();
    setTodoData(json.messege)
    json.messege.map((item) => {
      console.log(item)
    })
  }


  useEffect(() => {
    getData()

  }, []);

  
  const handleCompleted = async (id) => {
    try {
      const response = await fetch('http://localhost:3000/completed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
  
      if (!response.ok) {
        // Handle response errors
        console.error('Failed to update');
      } else {
        // Optional: Handle successful response
        console.log('Update successful');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  }
  
  
  



  return (



    <div className='w-1/2 flex flex-col '>
      {todoData.reverse().map((item) => (
        <div
          key={item.id}
          className="flex bg-neutral-900 border m-2  justify-between border-neutral-100 px-4 py-2 rounded-lg"
        >
          <div className="flex flex-col mr-12">
            <h1 className="text-2xl">{item.title}</h1>
            <h3 className="text-base">{item.description}</h3>
            <h4>{item.completed}</h4>
          </div>
          <button onClick={() => handleCompleted(item._id)}>{item.completed ? 'done': "do"} </button>

        </div>
      ))}
    </div>


  )


}

export default Todos;