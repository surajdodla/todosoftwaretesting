const express = require('express');
const { addTodo, deleteTodo, updateTodo, getTodos } = require('./todo');

const router = express.Router();
let todos = []; 

router.get('/todos', (req, res) => {
    res.json(todos.length ? getTodos(todos) : []);
});

router.post('/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Todo text is required" });
    }
    
    const newTodo = { id: Date.now(), text };
    todos = addTodo(todos, newTodo);
    res.status(201).json(newTodo);
});

router.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newTodos = deleteTodo(todos, id);

    if (newTodos.length === todos.length) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    todos = newTodos;
    res.json({ message: "Todo deleted" });
});

router.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Updated text is required" });
    }

    const newTodos = updateTodo(todos, id, text);

    if (JSON.stringify(newTodos) === JSON.stringify(todos)) {
        return res.status(404).json({ error: "Todo not found" });
    }

    todos = newTodos;
    res.json({ message: "Todo updated" });
});

module.exports = router;
