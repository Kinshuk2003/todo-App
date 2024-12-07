function loadTodos() {
    // Load the todos from local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoListsContainer = document.getElementById("todoListsContainer");
    todoListsContainer.innerHTML = ""; // Clear the container before adding todos
    appendTodoInHtml(todos);
}

function appendTodoInHtml(todos) {
    todos.forEach((todo, index) => {
        const container = document.createElement("div");
        container.className = "todo-container";

        const list = document.createElement("ul");
        const listItem = document.createElement("li");
        listItem.textContent = todo.text;

        if (todo.isCompleted) {
            listItem.classList.add("completed");
        }

        const btnDiv = document.createElement("div");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => {
            editTodo(index); // Edit the todo and refresh the UI
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
            deleteTodo(index); // Delete the todo and refresh the UI
        };

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.classList.add("complete-btn");
        completeButton.onclick = () => {
            completeTodo(index); // Edit the todo and refresh the UI
        };

        btnDiv.appendChild(completeButton);
        btnDiv.appendChild(editButton);
        btnDiv.appendChild(deleteButton);

        listItem.appendChild(btnDiv);
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
    todos.push({ text: todoText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = ""; // Clear the input field
    loadTodos(); // Refresh the list
}

function editTodo(index) {
    // Edit an existing todo and update local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const newTodoText = prompt("Enter the new todo:", todos[index].text);
    if (newTodoText !== null) {
        todos[index].text = newTodoText.trim();
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
    }
}

function completeTodo(index) {
    // Toggle the completion status of a todo and update local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos[index].isCompleted = !todos[index].isCompleted;
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos(); // Refresh the list
}

function deleteTodo(index) {
    // Remove a todo from the list and update local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.splice(index, 1); // Remove the selected todo
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos(); // Reload the list
}

function executeFilterAction(event) {
    const todoListsContainer = document.getElementById("todoListsContainer");
    todoListsContainer.innerHTML = "";
    const filterValue = event.target.getAttribute("data-filter");
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    if (filterValue === "All") {
        appendTodoInHtml(todos);
    } else if (filterValue === "Pending") {
        appendTodoInHtml(todos.filter(todo => !todo.isCompleted));
    } else if (filterValue === "Completed") {
        appendTodoInHtml(todos.filter(todo => todo.isCompleted));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    const filterBtns = document.getElementsByClassName("filterbtn");
    for (const btn of filterBtns) {
        btn.addEventListener("click", executeFilterAction);
    }
    document.getElementById("todoInput").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTodo();
        }
    });
});
