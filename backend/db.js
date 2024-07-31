const mongoose = require('mongoose')




mongoose.connect("mongodb+srv://chatgptapi13:Ma7rBJF07WCi6Xb5@cluster0.47ftwse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todo");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo  = mongoose.model('todos', todoSchema)
module.exports= {
    todo
}