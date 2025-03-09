let todos = [];

function addTodo(todos, newTodo) {
    return [...todos, newTodo];
}

function deleteTodo(todos, id) {
    return todos.filter(todo => todo.id !== id);
}

function updateTodo(todos, id, updatedText) {
    return todos.map(todo =>
        todo.id === id ? { ...todo, text: updatedText } : todo
    );
}

function getTodos(todos) {
    return todos;
}

module.exports = { addTodo, deleteTodo, updateTodo, getTodos };
