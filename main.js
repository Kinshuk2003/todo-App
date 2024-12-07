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
        const btnDiv = document.createElement("div");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        // editButton.classList.add("todo-list-btn");
        editButton.onclick = () => {
            editTodo(index); // Edit the todo and refresh the UI
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        // deleteButton.classList.add("todo-list-btn");
        deleteButton.onclick = () => {
            deleteTodo(index); // Delete the todo and refresh the UI
        };

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        // completeButton.classList.add("todo-list-btn");
        completeButton.onclick = () => {
            completeTodo(index); // Edit the todo and refresh the UI
        };

        btnDiv.appendChild(editButton);
        btnDiv.appendChild(deleteButton);
        btnDiv.appendChild(completeButton);
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
    todos.push({
        text: todoText,
        isCompleted: false});
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = ""; // Clear the input field
    loadTodos(); // Refresh the list
}

function editTodo(index) {
    // Edit an existing todo and update local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    //const todoInput = document.getElementById("todoInput");
    const newTodoText = prompt("Enter the new todo:", todos[index].text);
    if (newTodoText === null) {
        return; // User canceled the prompt
    }
    todos[index].text = newTodoText.trim();
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos(); // Refresh the list
}

function completeTodo(index) {
    // Toggle the completion status of a todo and update local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos[index].isCompleted = true;
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
    const element = event.target;
    const filterValue = element.getAttribute("data-filter");
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log(filterValue);
    if (filterValue === "All") {
        appendTodoInHtml(todos); // Show all todos if "All" is selected
        return;
    }   else if (filterValue === "Active") {
        const activeTodos = todos.filter(todo =>!todo.isCompleted);
        appendTodoInHtml(activeTodos); // Show active todos if "Active" is selected
        return;
    }   else if (filterValue === "Pending") {
        const pendingTodos = todos.filter(todo => todo.isCompleted);
        appendTodoInHtml(pendingTodos); // Show pending todos if "Pending" is selected
        return;
    }

    const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(filterValue.toLowerCase()));
    appendTodoInHtml(filteredTodos); // Update the list with the filtered todos
    
}
document.addEventListener("DOMContentLoaded", () => {
    loadTodos(); // Load todos when the DOM is fully loaded

    const filterbtns = document.getElementsByClassName("filterbtn");
    for(const btn of filterbtns) {
        btn.addEventListener("click", executeFilterAction);
    }   
});