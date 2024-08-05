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
    console.log('Updating todo with id:', id); // Log the id to ensure it's correct

    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        console.error('Failed to update'); // Log the failure reason
        alert("Update failed");
      } else {
        console.log('Update successful'); // Log the success
        alert("Update successful");
      }
    } catch (error) {
      console.error('Error:', error); // Log the error
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
          <div  className='gap-5  flex items-center'>
            <button onClick={() => handleCompleted(item._id)}>
              {!item.completed ? '⭕' : '✅'}
            </button >
            <button onClick={() => handleCompleted(item._id)}>
              ❌
            </button>
          </div>


        </div>
      ))}
    </div>


  )


}

export default Todos;