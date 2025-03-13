const API_URL = "http://localhost:3000/api/todos";

// Fetch and display todos
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch todos");

        const todos = await response.json();
        console.log("Fetched Todos:", todos);

        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = ""; // Clear list

        todos.forEach(todo => {
            const li = document.createElement("li");

            // ✅ Text container
            const textSpan = document.createElement("span");
            textSpan.classList.add("todo-text");
            textSpan.textContent = todo.text;

            // ✅ Button container (flexbox ensures alignment)
            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("todo-buttons");

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.classList.add("edit");
            editBtn.textContent = "Edit";
            editBtn.onclick = () => editTodo(todo.id);

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteTodo(todo.id);

            buttonDiv.appendChild(editBtn);
            buttonDiv.appendChild(deleteBtn);

            // Append text and buttons to todo item
            li.appendChild(textSpan);
            li.appendChild(buttonDiv);
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

// Add a new todo
async function addTodo() {
    const input = document.getElementById("todo-input");
    const text = input.value.trim();
    if (!text) return alert("Please enter a task!");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    input.value = "";
    fetchTodos();
}

// Delete a todo
async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTodos();
}

// Edit a todo
async function editTodo(id) {
    const newText = prompt("Enter new task:");
    if (!newText) return;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText })
    });

    fetchTodos();
}

// Load todos on page load
window.onload = fetchTodos;
