let todos = [];

function addTodo(todos, newTodo) {
    return [...todos, newTodo];
}
function deleteTodo(todos, id) {
    return todos.filter(todo => todo.id !== id);
}


module.exports = { addTodo, deleteTodo

      
};
