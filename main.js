function loadTodos() {
    // Load the todos from local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoListsContainer = document.getElementById("todoListsContainer");
    todoListsContainer.innerHTML = ""; // Clear the container before adding todos

    todos.forEach((todo, index) => {
        const container = document.createElement("div");
        container.className = "todo-container";

        const list = document.createElement("ul");
        const listItem = document.createElement("li");
        listItem.textContent = todo;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
            deleteTodo(index); // Delete the todo and refresh the UI
        };

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        container.appendChild(list);

        todoListsContainer.appendChild(container);
    });
}

function addTodo() {
    // Add a new todo to local storage
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        alert("Please enter a todo.");
        return;
    }
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = ""; // Clear the input field
    loadTodos(); // Refresh the list
}

function deleteTodo(index) {
    // Remove a todo from the list and update local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.splice(index, 1); // Remove the selected todo
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos(); // Reload the list
}

document.addEventListener("DOMContentLoaded", () => {
    loadTodos(); // Load todos when the DOM is fully loaded
});