const express = require('express');
const { createToDo, updateToDo } = require('./types');
const { todo } = require('./db');
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createToDo.safeParse(createPayload)  //zod validation
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



app.put('/todo', async (req, res) => {
    console.log('Received update request:', req.body); // Log the request body

    try {
        const todos = await todo.updateOne(
            { _id: req.body.id },
            { $set: { completed: true } }
        );

        console.log('Update result:', todos); // Log the update result

        res.json({
            message: 'Todo updated',
            data: todos
        });
    } catch (error) {
        console.error('Update error:', error); // Log the error
        res.status(500).json({ message: 'Update failed', error });
    }
});



app.delete('/delete', (req, res) => {

})

app.listen(3000)

