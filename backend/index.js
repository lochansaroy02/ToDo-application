const express = require('express');
const { createToDo, updateToDo } = require('./types');
const { todo } = require('./db');
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/todo', async (req, res) => {

    const createPayload = req.body;
    const parsePayload = createToDo.safeParse(createPayload)
    if (!parsePayload.success) {
        res.status(411).json({
            messege: 'you passed wrong data '
        })
        return;

    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        messege: "todo created"
    })
})






app.get('/todo', async (req, res) => {
    const todos = await todo.find();
    res.json({
        messege: todos
    })
})



app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateToDo.safeParse(updatePayload)
    if (!parsePayload.success) {
        res.json({
            messege: "you have updated wrong information"
        })
        return
    }


    const todos = await todo.update(
        {
            _id: req.body.id
        },
        {
            completed: true
        }
    )
})



// app.put('/completed', async (req, res) => {
//     const updatePayload = req.body;


//     const parsePayload = updateToDo.safeParse(updatePayload);
//     console.log(parsePayload)
//     if (!parsePayload.success) {
//         res.status(400).json({
//             message: "Invalid data provided"
//         });
//         return;
//     }

//     try {
//         const todos = await todo.updateOne(
//             { _id: req.body.id },
//             { $set: { completed: true } }
//         );

//         if (todos.nModified === 0) {
//             // Handle case where no document was updated
//             res.status(404).json({
//                 message: "Todo not found or already updated"
//             });
//         } else {
//             // Successfully updated
//             res.status(200).json({
//                 message: "Todo updated successfully"
//             });
//         }
//     } catch (error) {
//         // Handle potential errors
//         res.status(500).json({
//             message: "An error occurred while updating"
//         });
//     }
// });



app.delete('/delete', (req, res) => {

})

app.listen(3000)

